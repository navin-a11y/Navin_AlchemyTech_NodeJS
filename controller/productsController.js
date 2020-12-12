const catchAsync = require('./../utils/catchAsync');
const Products = require('./../Model/productsModel');
const product = require('./../Model/productsModel');

exports.createProducts = catchAsync(async(req,res) => {
    const {name, price, quantity} = req.body;

    let response;
    const products = Products({name:name, price:price, quantity:quantity});

    response = await products.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getProducts = catchAsync(async(req, res) => {
    let response;

    response = await Products.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

