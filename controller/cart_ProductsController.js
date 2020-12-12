const catchAsync = require('./../utils/catchAsync');
const cartProducts = require('./../Model/cart_ProductsModel');
const cart = require('./../Model/cartModel');
const AppError = require('../utils/appError');
const productModel = require('./../Model/productsModel');


exports.addProductToCart = catchAsync(async(req,res,next) => {
    // check product quantity
    const {quantity, productId} = req.body;
    const user = req.user;

    const productResult = await productModel.findById({_id: productId});
    console.log(productResult);
    // if there is product then add it to the cart
    if(productResult && productResult.quantity <= 0){
        return next(new AppError('Quantity is not sufficient', 400));
    }

    if(quantity > productResult.quantity) {
        return next(new AppError("Sorry, Quantity is no sufficient", 400));
    }

    const cartItem = {totalQuantity: quantity, netAmount: ( productResult.price/productResult.quantity)*quantity, 
        userId: user._id, productId: productId};
        console.log(cartItem);
    const cartInsertResult = await cart.insertMany([cartItem]);

    res.status(200).json({
        status: "success",
        data: cartInsertResult
    });
});

exports.orderProduct = catchAsync(async(req,res) => {
    // take cart added product id
    const {_id} = req.body;
    const prod = await cart.findById({_id });
    
    // store everything in cartproduct
    const item =  {quantity: prod.totalQuantity, netAmount: prod.netAmount, cartId: _id, 
        productId: prod.productId[0]};
    const totalOrder = await cartProducts.insertMany([item]);
 
    if(totalOrder) {
        // decrease quantity
        await productModel.findByIdAndUpdate({_id: prod.productId}, {$inc: {quantity: -item.quantity}});
    }

    res.status(200).json({
        status: "success",
        data: totalOrder
    });
});

exports.createCartProducts = catchAsync(async(req,res) => {
    const {quantity, netAmount} = req.body;

    let response;
    const cartproducts = cartProducts({quantity:quantity, netAmount: netAmount});

    response = await cartproducts.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getCartProducts = catchAsync(async(req, res) => {
    let response;

    response = await cartProducts.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});