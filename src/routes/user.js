const express = require("express")
const User = require("../app/models/User")
const userController = require("../app/controllers/UserController");
const { verifyToken } = require("../app/middleware/verifyToken");
const { Router } = require("express");
const route = express.Router();

route.post("/getOnlineUser",verifyToken,userController.getOnlineUsers)
route.post("/follow",verifyToken,userController.follow);
route.get("/getUsers",verifyToken,userController.getUsers);
route.get("/:userId",verifyToken,userController.index);


module.exports = route