const express = require("express")
const Product = require("../models/product")
const Review = require("../models/review")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("<h1>Landing page !!!</h1><a href='/products'>View Products</a>")
})

// Display all  the products
router.get("/products", async (req, res) => {
  const products = await Product.find({})
  // console.log(req.session,"-----------")
  res.render("products/index", { products, msg: req.flash("success") })
})

// Get the Form for product
router.get("/products/new", (req, res)=>{
  res.render("products/new")
})

// Create new product
router.post("/products",async (req,res)=>{
  // console.log(req.body.product)
  await Product.create(req.body.product)
  req.flash("success","Product added successfully")
  // console.log(req.session,"-----------")
  res.redirect("/products")
})

// View Single Product
router.get("/products/:id",async (req, res)=>{
  const product = await Product.findById(req.params.id).populate("reviews")
  // console.log(product)
  res.render("products/show",{product})
})

// Get the Edit form
router.get("/products/:id/edit",async (req,res)=>{
  const product = await Product.findById(req.params.id)
  res.render("products/edit",{product})
})

// Edit/Update product
router.patch("/products/:id", async(req,res)=>{
  await Product.findByIdAndUpdate(req.params.id, req.body.product)
  req.flash("success","Post updated successfully")
  res.redirect(`/products/${req.params.id}`)
})

// Delete a particular Product
router.delete("/products/:id",async(req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.redirect("/products")
})

// Creating a New comment on products
router.post("/products/:id/review",async (req,res)=>{
  const product = await Product.findById(req.params.id)
  
  const review = new Review(req.body)
  product.reviews.push(review)
  // console.log(review)
  // console.log(product.reviews)
  // console.log(product)

  await review.save()
  await product.save()
  res.redirect(`/products/${req.params.id}`)
})

module.exports = router
