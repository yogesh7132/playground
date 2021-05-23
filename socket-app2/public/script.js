const btn = document.querySelector("button")
const inp = document.querySelector("input")
const list = document.querySelector("ul")
const socket = io()

btn.addEventListener("click",()=>{
    socket.emit("sendMsg",{
        msg: inp.value,
        id: socket.id
    })
    inp.value = ""
})

socket.on("receivedMsg",(data)=>{
    const li = document.createElement("li")
    li.innerText = `${data.id} says -- ${data.msg}`
    list.append(li)
})
