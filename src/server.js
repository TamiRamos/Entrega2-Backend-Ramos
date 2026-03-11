import express from "express"
import { engine } from "express-handlebars"
import http from "http"
import { Server } from "socket.io"

import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import ProductManager from "./managers/ProductManager.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const manager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine","handlebars")
app.set("views","./src/views")

app.use("/",viewsRouter)
app.use("/api/products",productsRouter)

io.on("connection", async (socket)=>{

console.log("cliente conectado")

const products = await manager.getProducts()

socket.emit("updateProducts",products)

socket.on("addProduct", async(product)=>{

await manager.addProduct(product)

const products = await manager.getProducts()

io.emit("updateProducts",products)

})

socket.on("deleteProduct", async(id)=>{

await manager.deleteProduct(id)

const products = await manager.getProducts()

io.emit("updateProducts",products)

})

})

server.listen(8080,()=>{

console.log("Servidor corriendo en puerto 8080")

})