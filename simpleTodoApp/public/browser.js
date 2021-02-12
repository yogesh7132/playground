function itemTemplate(todoValue){
     return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
     <span class="item-text">${todoValue.item}</span>
     <div>
       <button data-id="${todoValue._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
       <button data-id="${todoValue._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
     </div>
   </li>`
}

// Create feature
let todoInput = document.getElementById("todo-input")

document.getElementById("todo-form").addEventListener("submit",function(sEvent){
    sEvent.preventDefault();
    axios.post("/create-item",{"input":todoInput.value}).then(function(returnResponse){
        document.getElementById("todo-list").insertAdjacentHTML("beforeend",itemTemplate(returnResponse.data))
        todoInput.value=""
        todoInput.focus()
    }).catch(function(err){
        console.log(err)
    })
})

document.addEventListener("click",function(cEvent){
    // Delete feature
    if(cEvent.target.classList.contains("delete-me")){
        axios.post("/delete-item",{"deleteItemId":cEvent.target.getAttribute("data-id")}).then(function(){
            cEvent.target.parentElement.parentElement.remove()
        }).catch(function(){
            console.log("Item not deleted. Something went wrong")
        })
    }
    
    // Edit feature
    if (cEvent.target.classList.contains("edit-me")){
        let updatedItemValue = prompt("You clicked the Edit button", cEvent.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(updatedItemValue){
            axios.post("/update-item",{updatedText:updatedItemValue, updateItemId:cEvent.target.getAttribute("data-id")}).then(function(){
                cEvent.target.parentElement.parentElement.querySelector(".item-text").innerHTML = updatedItemValue
            }).catch(function(){
                console.log("Item not updated. Something went wrong.")
            })
        }
    }
})