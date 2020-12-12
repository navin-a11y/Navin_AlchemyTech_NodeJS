const express = require('express');
const auth = require('../controller/authController');

const cart_ProductRouter = express.Router();

const cartProd = require('./../controller/cart_ProductsController');

cart_ProductRouter.route('/api/v1/cartProd/create').post(cartProd.createCartProducts);
cart_ProductRouter.route('/api/v1/cartProd/lists').get(cartProd.getCartProducts); 
cart_ProductRouter.route('/api/v1/addItemToCart').get(auth.protect, cartProd.addProductToCart); 
cart_ProductRouter.route('/api/v1/orderProduct').get(cartProd.orderProduct); 

module.exports = cart_ProductRouter;