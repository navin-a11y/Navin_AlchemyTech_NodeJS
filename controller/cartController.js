const catchAsync = require('./../utils/catchAsync');
const Cart = require('./../Model/cartModel');

exports.createCart = catchAsync(async(req,res) => {
    const {totalQuantity, netAmount} = req.body;

    let response;
    const cart = Cart({totalQuantity:totalQuantity, netAmount:netAmount});

    response = await cart.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getCart = catchAsync(async(req, res) => {
    let response;

    response = await Cart.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});