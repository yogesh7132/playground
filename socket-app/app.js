const http = require("http")
const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.get("/",(req,res)=>{
    res.send("hi for express & http  ")
})

server.listen(3000,()=>{
    console.log("Server running at port 3000")
})