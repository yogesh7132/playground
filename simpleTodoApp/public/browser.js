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