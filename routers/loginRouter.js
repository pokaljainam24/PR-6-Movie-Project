const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');
const adminAuth = require('../middlewares/adminAuth');

loginRouter.get("/login", loginController.loginPage);
loginRouter.post("/login", loginController.loginUser);

module.exports = loginRouter;