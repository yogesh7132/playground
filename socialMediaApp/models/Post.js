const ObjectID = require("mongodb").ObjectID
const postCollection = require("../db").db().collection("posts")
const User = require("./User")

let Post = function(data, userid){
    this.data = data
    this.errors = []
    this.userid = userid
}

Post.prototype.cleanUp = function(){
    if(typeof(this.data.title) != "string") { this.data.title = ""}
    if(typeof(this.data.body) != "string") { this.data.body = ""}
    // get rid of bogud properties
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectID(this.userid)
    }
}

Post.prototype.validate = function(){
    if(this.data.title == "") { this.errors.push("You must provide a title")}
    if(this.data.body == "") { this.errors.push("You must provide post content")}
}

Post.prototype.create = function(){
    return new Promise( (resolve,reject) => {
        this.cleanUp()
        this.validate()
        //save post into database
        if(!this.errors.length){
            postCollection.insertOne(this.data).then( ()=>{
                resolve()
            }).catch(()=>{
                console.log("Mongodb Error in insertOne")
                reject()
            })
        }else{
            reject(this.errors)
        }
    })
}

Post.reuseablePostQuery = function(uniqueOperations){
    return new Promise( async (resolve, reject)=> {
        let aggOperations = uniqueOperations.concat([   
            {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument" }},
            {$project: {title:1, body:1, createdDate:1, author: {$arrayElemAt: ["$authorDocument",0]}}}
        ])
        let posts = await postCollection.aggregate(aggOperations).toArray()
        // Clean up author property in each post object
        posts = posts.map(function(post){
            post.author = {
                username: post.author.username,
                avatar: new User(post.author, true).avatar
            }
            return post
        })
        
        resolve(posts)
        
        
    })
}

Post.findSinglePostById = function(id){
    return new Promise( async (resolve, reject)=> {
        if(typeof(id) != "string" || !ObjectID.isValid(id)){
            reject()
            return
        }
        let posts = await reuseablePostQuery([
            {$match: {_id: new ObjectID(id)}}
        ])
        
        if(posts.length){
            // console.log(posts[0])
            resolve(posts[0])
        }else{
            reject()
        }
        
    })
}

Post.findPostByAuthorId = function(authorId){
    return Post.reuseablePostQuery([
        {$match: {author: authorId}},
        {$sort: {createdDate:-1}}
    ])
}

module.exports = Post