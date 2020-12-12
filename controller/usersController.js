const catchAsync = require('./../utils/catchAsync');
const Users = require('./../Model/usersModel');
//const express = require('express');

exports.createUsers = catchAsync(async(req,res) => {
    const {name, email, phone, password} = req.body;

    let response;
    const user = Users({name:name, email:email, phone:phone, password:password});

    response = await user.save();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});

exports.getUser = catchAsync(async(req, res) => {
    let response;

    response = await Users.find();

    res.status(200).json({
        status: "success",
        result: response.length,
        data: response
    });
});