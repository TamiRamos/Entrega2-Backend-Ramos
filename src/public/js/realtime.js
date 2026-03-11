const socket = io()

const list = document.getElementById("productList")

socket.on("updateProducts",(products)=>{

list.innerHTML=""

products.forEach(p=>{

const li=document.createElement("li")

li.innerHTML = `
<strong>${p.title}</strong>
<span class="badge bg-primary ms-2">$${p.price}</span>
<br>
<small>ID: ${p.id}</small>
`

list.appendChild(li)

})

})

const form=document.getElementById("productForm")

form.addEventListener("submit",(e)=>{

e.preventDefault()

const product={

title:form.title.value,
price:form.price.value

}

socket.emit("addProduct",product)

form.reset()

})

const deleteBtn=document.getElementById("deleteBtn")

deleteBtn.addEventListener("click",()=>{

const id=document.getElementById("deleteId").value

socket.emit("deleteProduct",id)

alert("Producto agregado correctamente")
})