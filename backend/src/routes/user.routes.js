const express = require ("express")
const userController = require("../controllers/user.controller")
const { route } = require("./post.routes")
const userRouter = express.Router()
const identifyUser = require("../middlewares/post.middleware")


/** 

 @route post /api/users/follow/userid
 @description follow a user
 @access Private

*/



userRouter.post("/follow/:username", identifyUser, userController.followersController)

userRouter.post("/unfollow/:username",identifyUser, userController.unfollowUserController)


module.exports = userRouter
