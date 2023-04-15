import { Router } from "express"
import CartsManager from "../CartsManager.js"
import ProductManager from "../ProductManager.js"

const router = Router()

const manager = new CartsManager("src/carrito.json")
const pManager = new ProductManager("src/productos.json")

router.post("/", (req, res) => {
  manager.crearCarrito()
  res.json(manager.getCarritos())
})

router.get("/", (req, res) => {
  res.json(manager.getCarritos())
})

router.get("/:cid", (req, res) => {
  const id = Number(req.params.cid)
  const cartProducts = manager.getCarritoProducts(id)

  if (!cartProducts) {
    res.send({ error: "Cart non existant" })
    return
  }
  res.json({ products: cartProducts })
})

router.post("/:cid/product/:pid", (req, res) => {
  const cartId = Number(req.params.cid)
  const productId = Number(req.params.pid)

  pManager.getProductById(productId) ? manager.addItemToCarrito(cartId, productId) : console.error("Product not found")

  res.json(manager.getCarritos())
})

export default router