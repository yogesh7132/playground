document.addEventListener("click",function(cEvent){
    if (cEvent.target.classList.contains("edit-me")){
        let updatedItemValue = prompt("You clicked the Edit button")
        axios.post("/update-item",{updatedText:updatedItemValue}).then(function(){
            //add code
        }).catch(function(){
            console.log("Something went wrong. Contant again later on")
        })
    }
})