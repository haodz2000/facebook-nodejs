const express = require("express")
const route = express.Router();
const Post = require('../app/models/Post')
const {verifyToken} = require('../app/middleware/verifyToken')
const postController = require("../app/controllers/PostController")
route.post("/store",verifyToken,postController.store);

route.get("/timeline/:userId",verifyToken,postController.gets)

module.exports = route;
