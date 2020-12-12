const express = require('express');

const productRouter = express.Router();

const Product = require('./../controller/productsController');

productRouter.route('/api/v1/product/create').post(Product.createProducts);
productRouter.route('/api/v1/product/lists').get(Product.getProducts); 

module.exports = productRouter;