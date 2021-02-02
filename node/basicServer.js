let http = require("http")

let myApp = http.createServer(interact)
    

function interact(req,res){
    if (req.url == "/"){
        res.end("Welcome to the home page")
    }
    if (req.url == "/about"){
        res.end("Welcome to the About Us page")
    }
    res.end("Page not Found")
    
}

myApp.listen(3000)
