const mongodb = require("mongodb")

const connectionString = "mongodb://localhost:27017/SocialMediaApp"
mongodb.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology:true},function(err,client){
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
})