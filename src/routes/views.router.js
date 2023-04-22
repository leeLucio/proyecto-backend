import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()
const manager = new ProductManager("src/productos.json")

router.get("/", (req, res) => {
  res.render("index", { name: "Papa frita" })
})

router.get("/realtimeproducts", (req, res) => {
  const products = manager.getProducts()
  const data = {
    title: "Productos en tiempo real",
    products: products
  }

  res.render("realTimeProducts", data)
})

router.get("/home", (req, res) => {
  const products = manager.getProducts()
  res.render("home", { title: "Lista de productos", products: products })
})

export default router