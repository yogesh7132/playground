const express = require("express")
const path = require("path")
const session = require("express-session")
const MongoStore  = require("connect-mongo")
// const dbClient = require("./db")
const app = express()


// create session
app.use(session({
    secret:"This is a weak secret",
    // store: MongoStore.create({client: dbClient}),
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/testSession' }),
    resave: false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60}
}))

// Adding user in session ----------------
app.get("/",(req,res)=>{
    req.session.user = "Jatin"
    // console.log(req.session)
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
    // req.session = null
    console.log(req.session)
    res.send("Session destroyed successfully")
    // console.log(req.session)
})

app.get("/db",async (req,res)=>{
    try{
        req.session.dba = "db"
        // await db().collection("test").insertOne({"name":"Amit Sharma"})
        // const user = await db().collection("test").find({})
        
        // const result = await dbClient.db().collection("test").findOne({name:"Amit Sharma"})
        // console.log(result)
        res.send("result")
        
        
    }catch(err){
        console.log("Mongo Error: ",err)
        res.send("Something went wrong")
    }
})

app.listen("5000",()=>{
    console.log("Server started at port 5000")
})

// module.exports = app