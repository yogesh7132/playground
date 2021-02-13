const User = require('../models/User')

exports.home = function(req,res){
    res.render('home-guest')
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