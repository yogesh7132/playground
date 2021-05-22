const http = require("http")
const express = require("express")
const socketio = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// app.use("/",express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname,"public")))

app.use("/",(req,res)=>{
    res.render("index")
})

io.on("connection", (socket)=>{
    console.log(socket.id)

    socket.on("boomClientEvent",(data)=>{
        console.log("boomEvent running -- ", data)
    })

    socket.emit("abcdServerEvent","i am fine")
})

// app.get("/",(req,res)=>{
//     res.send("hi for express & http  ")
// })

server.listen(3000,()=>{
    console.log("Server running at port 3000")
})