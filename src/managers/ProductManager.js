import fs from "fs"

export default class ProductManager {

constructor() {
this.path = "./src/data/products.json"
}

async getProducts() {
const data = await fs.promises.readFile(this.path, "utf-8")
return JSON.parse(data)
}

async addProduct(product) {

const products = await this.getProducts()

product.id = Date.now()

products.push(product)

await fs.promises.writeFile(
this.path,
JSON.stringify(products, null, 2)
)

}

async deleteProduct(id){

let products = await this.getProducts()

products = products.filter(p => p.id != id)

await fs.promises.writeFile(
this.path,
JSON.stringify(products, null, 2)
)

}

}