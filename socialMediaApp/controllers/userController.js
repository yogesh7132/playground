const User = require("../models/User")
const Post = require("../models/Post")
const Follow = require("../models/Follow")

exports.sharedProfileData = async function (req, res, next) {
  let isVisitorProfile = false
  let isFollowing = false

  if (req.session.user) {
    isVisitorProfile = req.profileUser._id.equals(req.session.user._id)
    isFollowing = await Follow.isVisitorFollowing(req.profileUser._id, req.visitorId)
  }
  req.isVisitorProfile = isVisitorProfile
  req.isFollowing = isFollowing

  // retrive postr followers and following Counts
  let postCountPromise = Post.countPostByAuthorId(req.profileUser._id)
  let followersCountPromise = Follow.countFollowersById(req.profileUser._id)
  let followingCountPromise = Follow.countFollowingById(req.profileUser._id)
  let [postCount, followersCount, followingCount] = await Promise.all([postCountPromise, followersCountPromise, followingCountPromise])
  req.postCount = postCount
  req.followersCount = followersCount
  req.followingCount = followingCount

  next()
}

exports.mustBeLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.flash("errors", "You must be logged in to perform this action")
    req.session.save(function () {
      res.redirect("/")
    })
  }
}

exports.home = async function (req, res) {
  if (req.session.user) {
    // fetch feed of posts for current user
    let posts = await Post.getFeed(req.session.user._id)
    res.render("home-dashboard", { posts: posts })
  } else {
    res.render("home-guest", { regErrors: req.flash("regErrors") })
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

exports.ifUserExists = function (req, res, next) {
  User.findByUsername(req.params.username)
    .then(function (userDocument) {
      req.profileUser = userDocument // creating a new property in request object
      next()
    })
    .catch(function () {
      res.render("404")
    })
}

// exports.profilePostScreen = function(req,res){
//   res.render("profile",{profileUsername: req.profileUser.username, profileAvatar: req.profileUser.avatar})
// }

exports.profilePostScreen = function (req, res) {
  //ask our post model for posts by a certain author id
  Post.findPostByAuthorId(req.profileUser._id)
    .then(function (posts) {
      // console.log(posts)
      res.render("profile", {
        title: `Profile for ${req.profileUser.username}`,
        currentPage: "posts",
        posts: posts,
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar,
        isFollowing: req.isFollowing,
        isVisitorProfile: req.isVisitorProfile,
        counts: {
          postCount: req.postCount,
          followersCount: req.followersCount,
          followingCount: req.followingCount
        }
      })
    })
    .catch(function () {
      res.render("404")
    })
}

exports.profileFollowersScreen = async function (req, res) {
  try {
    let followers = await Follow.getFollowersById(req.profileUser._id)
    res.render("profile-followers", {
      currentPage: "followers",
      followers: followers,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorProfile: req.isVisitorProfile,
      counts: {
        postCount: req.postCount,
        followersCount: req.followersCount,
        followingCount: req.followingCount
      }
    })
  } catch {
    res.render("404")
  }
}

exports.profileFollowingScreen = async function (req, res) {
  try {
    let following = await Follow.getFollowingById(req.profileUser._id)
    res.render("profile-following", {
      currentPage: "following",
      following: following,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorProfile: req.isVisitorProfile,
      counts: {
        postCount: req.postCount,
        followersCount: req.followersCount,
        followingCount: req.followingCount
      }
    })
  } catch {
    res.render("404")
  }
}
