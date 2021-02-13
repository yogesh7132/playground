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

User.prototype.register = function(){
    this.validate()
}

module.exports = User