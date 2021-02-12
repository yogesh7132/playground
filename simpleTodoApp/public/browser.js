document.addEventListener("click",function(cEvent){
    if (cEvent.target.classList.contains("edit-me")){
        let updatedItemValue = prompt("You clicked the Edit button", cEvent.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(updatedItemValue){
            axios.post("/update-item",{updatedText:updatedItemValue, itemId:cEvent.target.getAttribute("data-id")}).then(function(){
                cEvent.target.parentElement.parentElement.querySelector(".item-text").innerHTML = updatedItemValue
            }).catch(function(){
                console.log("Something went wrong. Contant again later on")
            })
        }
    }
})