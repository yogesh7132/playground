const User = require('../models/User')

exports.home = function(req,res){
    if(req.session.user){
        res.send("Welcome, you are logged in now !!")
    }else{
        res.render('home-guest')
    }
}

exports.login = function(req,res){
    let user = new User(req.body)
    user.login().then(function(status){
        req.session.user = {favColor:"blue", username: user.data.username}
        res.send(status)
    }).catch(function(err){
        res.send(`Catch block Error : ${err}`)
    })
}

exports.register = function(req,res){
    // console.log(req.body)
    let user = new User(req.body)
    user.register()
    if (user.error.length){
        res.send(user.error)
    }else{
        res.send("Thank you for registration")
    }
    
}