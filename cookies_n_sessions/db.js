// ------------- Using mongodb ------------------

// const mongodb = require("mongodb")

// mongodb
//     .connect('mongodb://localhost:27017/testSession', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(async (client)=>{
//         console.log("DB Connected")
//         // const res = await client.db().collection("test").findOne({name:"Amit Sharma"})
//         // console.log(res)
        
//         module.exports = client
//         const app = require("./mongostore")
//         app.listen("5000",()=>{
//             console.log("Server started at port 5000")
//         })
//     })
//     .catch(err =>{
//         console.log("DB Connection Error :",err)
//     })




// Create a new MongoClient -------------
const client = new mongodb.MongoClient('mongodb://localhost:27017/testSession', {useNewUrlParser: true, useUnifiedTopology: true});

// Connect the client to the server -------------
client.connect().then(()=>{
    console.log("DB Connected")
    module.exports = client
    const app = require("./mongostore")
    app.listen("5000",()=>{
        console.log("Server started at port 5000")
    })
})

