let express = require("express")
let ourApp = express()

ourApp.use(express.urlencoded({extended:false}))

ourApp.get('/',interact)
ourApp.post("/answer", postInteract)

ourApp.listen(3000)

function interact(req,res){
    res.send(`
    <form action="/answer" method="POST">
        <p> What color is the sky on a clear and sunny day?</p>
        <input name="skyColor" type="text" autocomplete="off">
        <button>Submit Answer</button>
    </form>
    `)}

function postInteract(req,res){
    if(req.body.skyColor.toUpperCase() == "BLUE"){
        res.send(`Congrats, your answer is correct
        <br><a href="/">Back to Home page</a>
        `)
    }else{
        res.send(`Sorry, your answer is incorrect
        <br><a href="/">Back to Home page</a>
        `)   
    }
    
}

