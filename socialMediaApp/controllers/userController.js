const User = require('../models/User')

exports.home = function(req,res){
    if(req.session.user){
        res.render('home-dashboard', {username: req.session.user.username})
    }else{
        res.render('home-guest', {errors: req.flash('errors')})
    }
}

exports.login = function(req,res){
    let user = new User(req.body)
    user.login().then(function(status){
        req.session.user = {favColor:"blue", username: user.data.username}
        req.session.save(function(){
            res.redirect('/')
        })
    }).catch(function(err){
        req.flash("errors", err)
        req.session.save(function(){
            res.redirect('/')
        })
    })
}

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/')
    })
}

exports.register = function(req,res){
    let user = new User(req.body)
    user.register()
    if (user.error.length){
        res.send(user.error)
    }else{
        res.send("Thank you for registration")
    }
    
}