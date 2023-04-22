const socketClient = io()

const formAdd = document.getElementById("addProduct")
const formDelete = document.getElementById("deleteProduct")

formAdd.addEventListener("submit", (event) => {
  event.preventDefault()

  const title = formAdd.querySelector('[name="title"]')
  const description = formAdd.querySelector('[name="description"]')
  const code = formAdd.querySelector('[name="code"]')
  const price = formAdd.querySelector('[name="price"]')
  const status = formAdd.querySelector('[name="status"]')
  const stock = formAdd.querySelector('[name="stock"]')
  const category = formAdd.querySelector('[name="category"]')

  const product = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    status: status.value,
    stock: stock.value,
    category: category.value
  }

  title.value = ""
  description.value = ""
  code.value = ""
  price.value = ""
  status.value = ""
  stock.value = ""
  category.value = ""

  socketClient.emit("addProduct", product)
})

socketClient.on("products", data => {
  const list = document.getElementById("productsList")
  list.innerHTML = ""
  data.forEach(prod => {
    list.innerHTML += `
      <li>
        Nombre: ${prod.title}, 
        Descripcion: ${prod.description}, 
        code: ${prod.code}, 
        price: ${prod.price}, 
        stock: ${prod.stock}, 
        category: ${prod.category},
        id: ${prod.id}
      </li>
      `
  });
})


formDelete.addEventListener("submit", (event) => {
  event.preventDefault()
  const formId = formDelete.querySelector("input[name='id']")
  const id = Number(formId.value)
  formId.value = ""

  socketClient.emit("deleteProduct", id)
})