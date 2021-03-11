const express = require("express")
const router = express()

const userController = require("./controllers/userController")
const postController = require("./controllers/postController")

//User Controller Routes
router.get("/", userController.home)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)

//Post Controller Routes
router.get("/create-post", userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post("/create-post", userController.mustBeLoggedIn, postController.create)
router.get('/post/:id',postController.viewSingle)

module.exports = router
