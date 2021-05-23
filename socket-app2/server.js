const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use("/",express.static(path.join(__dirname,"public")))

io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("sendMsg",(data)=>{
        console.log(`${socket.id} says -- ${data.msg}`)

        // socket.emit("receivedMsg", {
        //     msg:data.msg
        // })
        io.emit("receivedMsg", {
            msg:data.msg,
            id: data.id
        })
    })
})

server.listen(3000,()=>{
    console.log("Server running at port 3000")
})