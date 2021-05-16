const express = require("express")
const router = express.Router()
const User = require(("../models/users"))

// router.get("/testUserRegistration", async (req,res)=>{
//     const user = {username:"test", email:"test@test.com"}
//     const createdUser = await User.register(user, "password123")
//     res.send(createdUser)
// })

router.get("/register", async(req,res)=>{
    res.render('auth/signup')
})

router.post("/register", async (req,res)=>{
    try{
        const user = {username: req.body.username, email: req.body.email}
        const createdUser = await User.register(user, req.body.password)
        console.log(createdUser)
        req.flash("success","Registration Successful")
        res.redirect("products")        
    }catch(e){
        req.flash("error", e.message)
        res.redirect("/register")       
    }
})

module.exports = router
