const express = require('express');

const cartRouter = express.Router();

const Cart = require('./../controller/cartController');

cartRouter.route('/api/v1/cart/create').post(Cart.createCart);
cartRouter.route('/api/v1/cart/lists').get(Cart.getCart); 

module.exports = cartRouter;