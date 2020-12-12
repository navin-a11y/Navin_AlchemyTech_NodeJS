const express = require('express');

const categoryRouter = express.Router();

const Category = require('./../controller/catogriesController');

categoryRouter.route('/api/v1/categories/create').post(Category.createCatogries);
categoryRouter.route('/api/v1/categories/lists').get(Category.getCatogries); 

module.exports = categoryRouter;