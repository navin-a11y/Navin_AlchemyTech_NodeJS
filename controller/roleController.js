const catchAsync = require('./../utils/catchAsync');
const Roles = require('./../Model/roleModel');

exports.createRoles = catchAsync(async(req,res) => {
    const { name } = req.body;

    let response;
    const roles = Roles({name:name});

    response = await roles.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getRole = catchAsync(async(req, res) => {
    let response;

    response = await Roles.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});