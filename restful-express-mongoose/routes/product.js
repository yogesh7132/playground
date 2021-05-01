const express = require("express")
const router = express.Router()
const Product = require("../models/product")

router.get("/", (req, res) => {
  res.send('<a href="/products"> View Products</a>')
})

// Get all the products
router.get("/products", async (req, res) => {
  const products = await Product.find()
  res.render("index", { products })
})

// Form to create new product
router.get("/products/new", (req, res) => {
  res.render("new")
})

// Add product to database
router.post("/products", async (req, res) => {
  await Product.create(req.body)
  res.redirect("/products")
})

// Show single product
router.get("/products/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render("show", { product })
})

// Form to edit Product
router.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render("edit", { product })
})

// Update product on server
router.patch("/products/:id", async (req, res) => {
  const { id } = req.params
  // console.log(req.body)
  await Product.findByIdAndUpdate(id, req.body)
  res.redirect(`/products/${id}`)
})

// Delete product on server
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.redirect("/products")
})

module.exports = router
