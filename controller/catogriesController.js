const catchAsync = require('./../utils/catchAsync');
const Catogries = require('./../Model/categoriesModel');

exports.createCatogries = catchAsync(async(req,res) => {
    const {name} = req.body;

    let response;
    const catogries = Catogries({name:name});

    response = await catogries.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getCatogries = catchAsync(async(req, res) => {
    let response;

    response = await Catogries.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});
