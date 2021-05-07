const express = require("express")
const app = express()
const session = require("express-session")

app.set("view engine","ejs")
app.set("views", "folder")

app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60 }
}))


app.use((req,res,next)=>{
    console.log("Running :---")
    console.log(req.session)
    console.log("++++++++++++++")
    next()
})



app.get("/",(req,res)=>{
    // res.send("all done")
    // res.redirect("/home")
    console.log(req.session.user)
    req.session.user = "ram"
    console.log(req.session.user)
    res.render("index")
    console.log("index ends :------------- \n")
})

app.get("/home",(req,res)=>{
    // res.send("all done")
    res.render("home")
    console.log("home ends :-------------\n")
})



app.listen("4000", ()=>{
    console.log("Server listening at port 4000")
})