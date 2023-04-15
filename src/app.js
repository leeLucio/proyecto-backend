import express from "express"
import productsRouter from "./routes/products.router.js"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  console.log("Alguien hizo una peticion ...")
  res.send("<h1>Hola mundo!!!</h1>")
})

app.use("/api/products", productsRouter)

app.listen(8080, () => console.log("Server up"))