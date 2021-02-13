const express = require('express')
const router = express()

router.get('/', function(req,res){
    res.render('home-guest')
})

router.get('/about',function(req,res){
    res.send("Welcome to about us page")
})

module.exports = router