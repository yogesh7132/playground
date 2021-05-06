const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())

app.get("/",(req,res)=>{
    // console.log(req.cookies)
    // res.cookie("name", "amit")
    res.cookie("name", {"firstname":"Amit","lastname":"Sharma"})
    res.send("Cookies set successfully")
})

app.get("/hello",(req,res)=>{
    const {name = {"firstname":"Guest"}} = req.cookies
    res.send(`Hello ${name.firstname}`)
    // res.send(`Hello ${req.cookies.name.firstname}`)
})

app.listen("3000",()=>{
    console.log("Server started at port 3000")
})