const express = require("express")
const  session = require("express-session")

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const app = express()
console.log(process.env.DB_STRING)

app.listen(process.env.PORT || 5000,()=> {
    console.log(`Server running at port ${process.env.PORT}`)
})