const btn  = document.querySelector("button")
const socket = io()

setTimeout(()=>{
    console.log(socket.id)
},2000)

btn.addEventListener('click',()=>{
    socket.emit("boomClientEvent","How are you ??")
})

socket.on("abcdServerEvent",(data)=>{
    console.log(data)
})