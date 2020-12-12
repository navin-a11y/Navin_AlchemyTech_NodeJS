const express = require('express');

const authRouter = express.Router();

const auth= require('./../controller/authController');

authRouter.route('/api/v1/login').post(auth.login);

module.exports = authRouter;