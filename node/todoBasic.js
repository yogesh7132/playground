let taskInput = document.getElementById("taskInput")
let todoForm = document.getElementById("defaultForm")
let displayList = document.getElementById("displayList")

todoForm.addEventListener("submit", handelEvent) 
// function(event){ 
//     event.preventDefault()
//     createList()
// })

function handelEvent(event){
    event.preventDefault()
    createList()
}

function createList(){
    displayList.insertAdjacentHTML("beforeend",`<li> ${taskInput.value} <button onclick="deleteItem(this)">Delete</button></li>`)
    taskInput.value = ""
    taskInput.focus()
}

function deleteItem(selectedElement){
    selectedElement.parentElement.remove()
}