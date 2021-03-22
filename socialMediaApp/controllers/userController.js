const User = require("../models/User")
const Post = require("../models/Post")
const Follow = require("../models/Follow")

exports.sharedProfileData = async function(req, res, next){
  let isVisitorProfile = false
  let isFollowing = false
  if(req.session.user){
    isVisitorProfile = req.profileUser._id.equals(req.session.user._id)
    isFollowing = await Follow.isVisitorFollowing(req.profileUser._id, req.visitorId)
  }
  req.isVisitorProfile = isVisitorProfile
  req.isFollowing = isFollowing
  next()
}

exports.mustBeLoggedIn =  function(req,res,next){
  if(req.session.user){
    next()
  }else{
    req.flash("errors", "You must be logged in to perform this action")
    req.session.save(function () {
      res.redirect("/")
    })
  }
}

exports.home = function (req, res) {
  if (req.session.user) {
    res.render("home-dashboard")
  } else {
    res.render("home-guest", {regErrors: req.flash("regErrors") })
  }
}

exports.login = function (req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(function (status) {
      req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id }
      // console.log(user.data._id)
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch(function (err) {
      req.flash("errors", err)
      req.session.save(function () {
        res.redirect("/")
      })
    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      req.session.user = { username: user.data.username, avatar: user.avatar, _id: user.data._id }
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch(regErrors => {
      regErrors.forEach(function (errMsg) {
        req.flash("regErrors", errMsg)
      })
      req.session.save(function () {
        res.redirect("/")
      })
    })
}

exports.ifUserExists = function(req, res, next){
  User.findByUsername(req.params.username).then(function(userDocument){
    req.profileUser = userDocument      // creating a new property in request object
    next()
  }).catch(function(){
    res.render("404")
  })
}

// exports.profilePostScreen = function(req,res){
//   res.render("profile",{profileUsername: req.profileUser.username, profileAvatar: req.profileUser.avatar})
// }

exports.profilePostScreen = function(req,res){
  //ask our post model for posts by a certain author id
  Post.findPostByAuthorId(req.profileUser._id).then(function(posts){
    // console.log(posts)
    res.render("profile",{
      posts:posts, 
      profileUsername: req.profileUser.username, 
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorProfile: req.isVisitorProfile
      })
  }).catch(function(){
    res.render("404")
  })
}