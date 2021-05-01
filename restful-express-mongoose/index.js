const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const Product = require("./models/product")
const productRoutes = require("./routes/product")
// const seedDB = require("./seed")

const app = express()

app.use(methodOverride("_method"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: false }))

// Database connection
mongoose
  .connect("mongodb://localhost:27017/shopApp", { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected")
  })
  .catch(err => {
    console.log("Connection Error: ", err)
  })

// seedDB()

// Routes
app.use(productRoutes)

app.listen(3000, () => {
  console.log("Server running at port 3000")
})
