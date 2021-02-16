const userCollection = require("../db").collection('users')

let validator = require("validator")

let User = function(incomingData){
    this.data = incomingData
    this.error = []
}

User.prototype.validate = function(){
    if(this.data.username == "") {this.error.push("Enter valid username")}
    if(this.data.username != "" && validator.isAlphanumeric(this.data.username)) {"Username can only be Letters and Numbers"}
    if(!validator.isEmail(this.data.email)) {this.error.push("Enter valid email")}
    if(this.data.password == "") {this.error.push("Enter valid password")}
    if(this.data.password.length < 6) {this.error.push("password length should be of minimum 6 characters")}
}

User.prototype.catchUp= function(){
    if(typeof(this.data.username) != "string") {this.data.username=""}
    if(typeof(this.data.email) != "string") {this.data.email=""}
    if(typeof(this.data.password) != "string") {this.data.password=""}

    // getting rid of bogus properties
    this.data = {
        username : this.data.username.trim().toLowerCase(),
        email : this.data.email.trim().toLowerCase(),
        password : this.data.password
    }
}

User.prototype.login = function(callbackResult){
    userCollection.findOne({username: this.data.username}, (err, userDetail)=>{
        if(userDetail && userDetail.password == this.data.password ){
            callbackResult("Congrats")
        }else{
            callbackResult("Invalid Username/Password")
        }
    })
}

User.prototype.register = function(){
    // Clean & Validate the data
    this.catchUp()
    this.validate()
    // Save data to Database
    userCollection.insertOne(this.data)
}

module.exports = User