const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
// const seedDB = require("./seed")

const app = express()

app.use(methodOverride("_method"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: false }))

mongoose
  .connect("mongodb://localhost:27017/shopApp", { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected")
  })
  .catch(err => {
    console.log("Connection Error: ", err)
  })

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0
  },
  desc: {
    type: String
  }
})

const Product = mongoose.model("Product", productSchema)

// seedDB()

app.get("/", (req, res) => {
  res.send('<a href="/products"> View Products</a>')
})

// Get all the products
app.get("/products", async (req, res) => {
  const products = await Product.find()
  res.render("index", { products })
})

// Form to create new product
app.get("/products/new", (req, res) => {
  res.render("new")
})

// Add product to database
app.post("/products", async (req, res) => {
  await Product.create(req.body)
  res.redirect("/products")
})

// Show single product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render("show", { product })
})

// Form to edit Product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render("edit", { product })
})

// Update product on server
app.patch("/products/:id", async (req, res) => {
  const { id } = req.params
  // console.log(req.body)
  await Product.findByIdAndUpdate(id, req.body)
  res.redirect(`/products/${id}`)
})

// Delete product on server
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.redirect("/products")
})

app.listen(3000, () => {
  console.log("Server running at port 3000")
})
