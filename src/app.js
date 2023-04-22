import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

import handlebars from "express-handlebars"
import { Server } from "socket.io"
import __dirname from "./utils.js"
import ProductManager from "./ProductManager.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = app.listen(8080, () => console.log("Server up"))
const socketServer = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.static(__dirname + "/public"))
app.use("/", viewsRouter)

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

socketServer.on("connection", (socketClient) => {
  console.log("Nuevo cliente conectado...")
  const manager = new ProductManager("src/productos.json")
  socketClient.emit("products", manager.getProducts())

  socketClient.on("addProduct", (data) => {
    manager.addProduct(data)
    socketClient.emit("products", manager.getProducts())
  })

  socketClient.on("deleteProduct", data =>{
    manager.deleteProduct(data)
    socketClient.emit("products", manager.getProducts())
  })
})