const express = require('express');
const route = express.Router();
const authController = require('../app/controllers/AuthController');
const User = require('../app/models/User');

route.post("/register",authController.register);

route.post("/login",authController.login);

route.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = route;

