const express = require('express');

const userRouter = express.Router();

const User = require('./../controller/usersController');

userRouter.route('/api/v1/user/create').post(User.createUsers);
userRouter.route('/api/v1/user/lists').get(User.getUser);    

module.exports = userRouter;