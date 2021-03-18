let Post = require("../models/Post")

exports.viewCreateScreen = function(req,res){
    res.render("create-post")
}

exports.create = function(req,res){
    let post = new Post(req.body, req.session.user._id)
    post.create().then(function(newId){
        req.flash("success", "New post successfully created")
        req.session.save( ()=> res.redirect(`/post/${newId}`) )
    }).catch(function(postErrors){
        postErrors.forEach( error => req.flash("errors", error))
        req.session.save( ()=> res.redirect("/create-post") )
    })
}

exports.viewSinglePost = async function(req,res){
    try{
        let post = await Post.findSinglePostById(req.params.id, req.visitorId)
        res.render('single-post-screen', {post: post})
    }catch{
        res.render("404")
    }
}

exports.viewEditScreen = async function(req,res){
    try{
        let post = await Post.findSinglePostById(req.params.id)
        if(post.authorId == req.visitorId){
            res.render("edit-post", {post: post})
        }else{
            req.flash("errors", "You don't have permission to perform that action")
            req.session.save(() => res.redirect("/") )
        }
    }catch{
        res.render("404")
    }
}

exports.edit = function(req, res){
    let post = new Post(req.body, req.visitorId, req.params.id)
    post.update().then( (status)=> {
        //the post was successfully updated in database
        // or user did have  permission, but there were error
        if( status == "success"){
            // post was successfully updated
            req.flash("success", "post successfully updated")
            req.session.save(function(){
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }else{
            post.errors.forEach(function(error){
                req.flash("errors", error)
            })
            req.session.save(function(){
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }
    }).catch( ()=> {
        // a post with requested id doesn't exit
        // or if the current visitor is not the owner of the request
        req.flash("errors", "You don't have permission to perform that action")
        req.session.save(function(){
            res.redirect("/")
        })
    })
}

exports.delete = function(req,res){
    Post.delete(req.params.id, req.visitorId).then( ()=>{
        req.flash("success","Post successfully deleted.")
        req.session.save(()=> res.redirect(`/profile/${req.session.user.username}`))
    }).catch(()=>{
        req.flash("errors","You do not have permission to perform this action.")
        req.session.save(()=> res.redirect(`/`))
    })
}