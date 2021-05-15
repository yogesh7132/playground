const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const productRoutes = require("./routes/product")
const methodOveride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
// const seedDB = require("./seed")

const app = express()
app.set("view engine", "ejs")
app.set("views"), path.join(__dirname, "views")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOveride("_method"))

const sessionOptions = {
  secret:"weak secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60 }
}
app.use(session(sessionOptions))
app.use(flash())

// Middleware
app.use((req,res,next)=>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

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
