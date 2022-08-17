const express = require("express")
const route = express.Router();
const messageController = require("../app/controllers/MessageController");
const { verifyToken } = require("../app/middleware/verifyToken");


route.post("/loadMessage",verifyToken,messageController.loadMessage)
route.post("/store",verifyToken,messageController.store)
module.exports = route