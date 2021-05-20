const express = require("express")
const path = require("path")
const connectDb = require("./db")
const Blog = require("./models/blog")

// Connecting to the database 
connectDb()


const app =  express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    res.send("ok ok")
})


app.listen(8080, ()=>{
    console.log("Server Running at Port 8080")
})