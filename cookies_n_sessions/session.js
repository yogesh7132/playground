const express = require("express")
const path = require("path")
const session = require("express-session")
const app = express()

// create session
app.use(session({
    secret:"This is a weak secret",
    resave: false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60}
}))

// Adding user in session ----------------
app.get("/",(req,res)=>{
    req.session.user = "Jatin"
    console.log(req.session)
    res.send("Session set successfully")
    // console.log(req.session)
})

// using session ----------------------
app.get("/hello",(req,res)=>{
    console.log(req.session)
    const {user = "Guest"} = req.session
    res.send(`Hello ${user}`)
})

// destroy session ----------------------
app.get("/destroySession",(req,res)=>{
    req.session.destroy()
    // delete req.session.user
    // req.session = null
    console.log(req.session)
    res.send("Session destroyed successfully")
    // console.log(req.session)
})

app.listen("4000",()=>{
    console.log("Server started at port 4000")
})