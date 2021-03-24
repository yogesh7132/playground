const ObjectID = require("mongodb").ObjectID
const postCollection = require("../db").db().collection("posts")
const User = require("./User")
const sanitizeHTML =  require('sanitize-html')

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
        // body: this.data.body.trim(),
        body: sanitizeHTML(this.data.body.trim(),{allowedTags: [], allowedAttributes: []}),
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

Post.reuseablePostQuery = function(uniqueOperations, visitorId, finalOperations=[]){
    return new Promise( async (resolve, reject)=> {
        let aggOperations = uniqueOperations.concat([   
            {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument" }},
            {$project: {title:1, body:1, createdDate:1, authorId: "$author", author: {$arrayElemAt: ["$authorDocument",0]}}}
        ]).concat(finalOperations)
        let posts = await postCollection.aggregate(aggOperations).toArray()
        // Clean up author property in each post object
        posts = posts.map(function(post){
            post.isVisitorOwner = post.authorId.equals(visitorId)
            // delete post.authorId
            post.authorId = "undefined"
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

Post.delete = function(postIdToDelete, currentUserId) {
    return new Promise(async (resolve, reject)=>{
        try{
            let post = await Post.findSinglePostById(postIdToDelete, currentUserId)
            if(post.isVisitorOwner){
                await postCollection.deleteOne({_id: new ObjectID(postIdToDelete)})
                resolve()
            }else{
                //When someone is trying to delete the post they don't own
                reject()
            }
        }catch{
            // when post is not valid or Post does not exists
            console.log("inside catch")   //console
            reject()
        }
    })
}

Post.search = function(searchTerm){
    return new Promise(async (resolve,reject)=>{
        if(typeof(searchTerm) == "string"){
            let posts = await Post.reuseablePostQuery([
                {$match: {$text:{$search: searchTerm}}}
            ], undefined, [{$sort:{score:{$meta:"textScore"}}}])
            resolve(posts)
        }else{
            reject()
        }
    })
}

Post.countPostByAuthorId = function(id){
    return new Promise(async (resolve, reject)=>{
        let postCount = await postCollection.countDocuments({author:id})
        resolve(postCount)
    })
}

module.exports = Post