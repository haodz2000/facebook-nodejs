const express = require('express')
const route = express.Router();
const ConsController = require('../app/controllers/ConversationController');
const {verifyToken} = require('../app/middleware/verifyToken')

route.post("/create",verifyToken,ConsController.store)
route.post("/findExits",verifyToken,ConsController.findExits)
route.post("/findAll",verifyToken,ConsController.findAll)
route.get("/find/",verifyToken,ConsController.findOne)
module.exports = route