const express = require('express');

const roleRouter = express.Router();

const Role = require('./../controller/roleController');

roleRouter.route('/api/v1/role/create').post(Role.createRoles);
roleRouter.route('/api/v1/role/lists').get(Role.getRole); 

module.exports = roleRouter;
