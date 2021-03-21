const userCollection = require("../db").db().collection("users")
const followCollection = require("../db").db().collection("follow")
const ObjectID = require("mongodb").ObjectID

let Follow = function(followedUsername, authorId){
    this.followedUsername = followedUsername
    this.authorId = authorId
    this.errors = []
}

Follow.prototype.cleanUp = function(){
    if(typeof(this.followedUsername)!= "string"){
        this.followedUsername = ""
    }
}

Follow.prototype.validate = async function(){
    //followed username must exist in database
    let followedAccount = await userCollection.findOne({username: this.followedUsername})
    if(followedAccount){
        this.followedId = followedAccount._id 
    }else{
        this.errors.push("You cannot follow a user that does not exist.")
    }
}

Follow.prototype.create = function(){
    return new Promise(async (resolve, reject)=>{
        this.cleanUp()
        await this.validate()
        if(!this.errors.length){
            followCollection.insertOne({followedId: this.followedId,authorId: new ObjectID(this.authorId) })
            resolve()
        }else{
            reject(this.errors)
        }
    })
}

module.exports = Follow