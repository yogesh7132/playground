const ObjectID = require("mongodb").ObjectID
const postCollection = require("../db").db().collection("posts")
const User = require("./User")

let Post = function(data, userid, requestedPostId){
    this.data = data
    this.errors = []
    this.userid = userid
    this.requestedPostId = requestedPostId
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
            postCollection.insertOne(this.data).then( (info)=>{
                resolve(info.ops[0]._id)
            }).catch(()=>{
                this.errors.push("Please try again later : by MONGODB")
                reject(this.errors)
            })
        }else{
            reject(this.errors)
        }
    })
}

Post.reuseablePostQuery = function(uniqueOperations, visitorId){
    return new Promise( async (resolve, reject)=> {
        let aggOperations = uniqueOperations.concat([   
            {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument" }},
            {$project: {title:1, body:1, createdDate:1, authorId: "$author", author: {$arrayElemAt: ["$authorDocument",0]}}}
        ])
        let posts = await postCollection.aggregate(aggOperations).toArray()
        // Clean up author property in each post object
        posts = posts.map(function(post){
            post.isVisitorOwner = post.authorId.equals(visitorId)
            post.author = {
                username: post.author.username,
                avatar: new User(post.author, true).avatar
            }
            return post
        })
        resolve(posts)
    })
}

Post.findSinglePostById = function(id, visitorId){
    return new Promise( async (resolve, reject)=> {
        if(typeof(id) != "string" || !ObjectID.isValid(id)){
            reject()
            return
        }
        let posts = await Post.reuseablePostQuery([
            {$match: {_id: new ObjectID(id)}}
        ], visitorId)
        
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

Post.prototype.update = function(){
    return new Promise( async (resolve, reject) => {
        try{
            let post = await Post.findSinglePostById(this.requestedPostId, this.userid)
            if(post.isVisitorOwner){
                //actually change the datebase
                let status = await this.actuallyUpdate()
                resolve(status)
            }else{
                reject()
            }
        }catch{
            reject()
        }
    })
}

Post.prototype.actuallyUpdate = function(){
    return new Promise ( async(resolve, reject)=> {
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            await postCollection.findOneAndUpdate(
                {_id : new ObjectID(this.requestedPostId)},
                {$set: {title: this.data.title, body: this.data.body}
            })  
            resolve("success")
        }else{
            reject("failure")
        }
    })
}

module.exports = Post