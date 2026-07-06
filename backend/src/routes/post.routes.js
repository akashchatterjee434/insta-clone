const express = require('express')
const identifyUser =require("../middlewares/post.middleware")
const postRouter = express.Router()
const multer = require("multer")
const upload =multer({storage: multer.memoryStorage()}) 

const postController = require("../controllers/post.controller")

postRouter.post("/",upload.single("image"),identifyUser ,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)

postRouter.post("/like/:postId", identifyUser, postController.likePostController)
module.exports = postRouter