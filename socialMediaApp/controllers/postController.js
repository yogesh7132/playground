let Post = require("../models/Post")

exports.viewCreateScreen = function(req,res){
    res.render("create-post")
}

exports.create = function(req,res){
    let post = new Post(req.body, req.session.user._id)
    post.create().then(function(){
        res.send("New Post Created")
    }).catch(function(postErrors){
        res.send(postErrors)
    })
}

exports.viewSinglePost = async function(req,res){
    try{
        let post = await Post.findSinglePostById(req.params.id)
        res.render('single-post-screen', {post: post})
    }catch{
        res.render("404")
    }
}