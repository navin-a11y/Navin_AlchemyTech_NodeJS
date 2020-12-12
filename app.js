const express = require('express');
const globalErrorHandling = require('./controller/errorController');
const userRoute = require('./Router/userRouter');
const roleRouter = require('./Router/roleRouter');
const productRouter = require('./Router/productRouter');
const categoryRouter = require('./Router/categoriesRouter');
const cartRouter = require('./Router/cartRouter');
const catProdRouter = require('./Router/cart_productRouter');
const authRouter = require('./Router/authRouter');

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRoute);
app.use(roleRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(cartRouter);
app.use(catProdRouter);
app.use(globalErrorHandling);

module.exports = app;