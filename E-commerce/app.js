const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
// const seedDB = require("./seed")

const app = express()
app.set("view engine", "ejs")
app.set("views"), path.join(__dirname, "views")
app.use(express.static("public"))

// Database connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected")
  })
  .catch(err => {
    console.log("Connection Error: ", err)
  })

// Seed Database
// seedDB()

app.get("/", (req, res) => {
  res.send("Landing page")
})

app.listen("3000", () => {
  console.log("Server started at port 3000")
})
