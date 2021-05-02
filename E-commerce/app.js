const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const productRoutes = require("./routes/product")
const methodOveride = require("method-override")
// const seedDB = require("./seed")

const app = express()
app.set("view engine", "ejs")
app.set("views"), path.join(__dirname, "views")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOveride("_method"))

// Database connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
  .then(() => {
    console.log("DB Connected")
  })
  .catch(err => {
    console.log("Connection Error: ", err)
  })

// Seed Database
// seedDB()

// Routes
app.use(productRoutes)

app.listen("3000", () => {
  console.log("Server started at port 3000")
})
