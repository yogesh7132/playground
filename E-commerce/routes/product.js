const express = require("express")
const Product = require("../models/product")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("<h1>Landing page !!!</h1><a href='/products'>View Products</a>")
})

// Display all  the products
router.get("/products", async (req, res) => {
  const products = await Product.find({})
  res.render("products/index", { products })
})

// Get the Form for product
router.get("/products/new", (req, res)=>{
  res.render("products/new")
})

// Create new product
router.post("/products",async (req,res)=>{
  // console.log(req.body.product)
  await Product.create(req.body.product)
  res.redirect("/products")
})

// View Single Product
router.get("/products/:id",async (req, res)=>{
  const product = await Product.findById(req.params.id)
  res.render("products/show",{product})
})

// Get the Edit form
router.get("/products/:id/edit",async (req,res)=>{
  const product = await Product.findById(req.params.id)
  res.render("products/edit",{product})
})

// Update product
router.patch("/products/:id", async(req,res)=>{
  await Product.findByIdAndUpdate(req.params.id, req.body.product)
  res.redirect(`/products/${req.params.id}`)
})

// Delete a particular Product
router.delete("/products/:id",async(req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.redirect("/products")
})

module.exports = router