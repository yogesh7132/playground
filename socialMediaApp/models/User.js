const userCollection = require("../db").db().collection("users")
const bcrypt = require("bcrypt")
const md5 = require("md5")

let validator = require("validator")

let User = function (incomingData, getAvatar) {
  this.data = incomingData
  this.error = []
  if(getAvatar == undefined){getAvatar:false}
  if(getAvatar){this.getAvatar()}
}

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.error.push("Enter valid username")
    }
    if (this.data.username != "" && validator.isAlphanumeric(this.data.username)) {
      ;("Username can only be Letters and Numbers")
    }
    if (!validator.isEmail(this.data.email)) {
      this.error.push("Enter valid email")
    }
    if (this.data.password == "") {
      this.error.push("Enter valid password")
    }
    if (this.data.password != "" && this.data.password.length < 1) {
      this.error.push("password length should be of minimum 6 characters")
    }

    // Only is username is valid, check to see if alrady exists
    if (this.data.username.length > 2 && this.data.username.length < 10 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await userCollection.findOne({ username: this.data.username })
      // console.log(usernameExists)
      if (usernameExists) {
        this.error.push("This username aleardy exists")
      }
    }

    // Only is email is valid, check to see if alrady exists
    if (validator.isEmail(this.data.email)) {
      let emailExists = await userCollection.findOne({ email: this.data.email })
      if (emailExists) {
        this.error.push("This email aleardy exists")
      }
    }
    resolve()
  })
}

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = ""
  }
  if (typeof this.data.email != "string") {
    this.data.email = ""
  }
  if (typeof this.data.password != "string") {
    this.data.password = ""
  }

  // getting rid of bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    userCollection
      .findOne({ username: this.data.username })
      .then(userDetail => {
        if (userDetail && bcrypt.compareSync(this.data.password, userDetail.password)) {
          this.data = userDetail
          this.getAvatar()
          resolve("Congrats")
        } else {
          reject("Invalid Username/Password")
        }
      })
      .catch(function () {
        reject("Something went wrong with mongodb findOne method")
      })
  })
}

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // Clean & Validate the data
    this.cleanUp()
    await this.validate()
    // Save data to Database
    if (!this.error.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await userCollection.insertOne(this.data)
      this.getAvatar()
      resolve()
    } else {
      reject(this.error)
    }
  })
}

User.prototype.getAvatar = function () {
  this.avatar = `http://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}


User.findByUsername = function(username){
  return new Promise (function(resolve, reject){
    if(typeof(username) != "string"){
      reject()
      return
    }
    userCollection.findOne({username: username}).then(function(userDoc){
      if(userDoc){
        userDoc = new User(userDoc, true)
        userDoc = {
          _id : userDoc.data._id,
          username : userDoc.data.username,
          avatar : userDoc.avatar
        }
        resolve(userDoc)
      }
      else{
          reject()
        }
    }).catch(function(){
      reject()  // Error with mongodb
    })
  })
}

module.exports = User
