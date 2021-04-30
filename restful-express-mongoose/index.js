const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
// const seedDB = require("./seed")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

mongoose
  .connect("mongodb://localhost:27017/shopApp", { useNewUrlParser: true, useUnifiedTopology: true })
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

app.get("/products", async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

app.listen(3000, () => {
  console.log("Server running at port 3000")
})
