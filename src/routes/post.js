const express = require("express")
const route = express.Router();
const Post = require('../app/models/Post')
const {verifyToken} = require('../app/middleware/verifyToken')
const postController = require("../app/controllers/PostController")
const commentController = require('../app/controllers/CommentController')
route.post("/store",verifyToken,postController.store);

route.get("/timeline/:userId",verifyToken,postController.gets)

route.put("/like",verifyToken,postController.like)

route.post("/comment",commentController.store)

module.exports = route;
