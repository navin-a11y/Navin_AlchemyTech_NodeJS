const crypto = require('crypto');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../Model/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN *24*60*60*1000
        ),
        httpOnly: true,
    };
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    //Remove the shwoing password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {user},
    });
};

exports.login = catchAsync(async(req,res,next) => {
    const {email, password} = req.body;

    // 1. check if email and password is exists or not
    if(!email || !password){
        return next(new AppError("please provide the email and password", 400));
    }

    // 2. check if user is exit and password is correct
    const user = await User.findOne({email: email }).select("+password");

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Incorrect email or password!", 401));
    }

    // 3. if everything is Ok, then send token to client
    createSendToken(user, 200, res);
});


exports.protect = catchAsync(async(req,res,next) => {
    // 1. get the token and check that is it exists or not
    let token = "";

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new AppError("You are not logged in! please login to get access, 401"));
    };

    // 2. verification of token 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        return next(new AppError("The user belonging to this token no longer exists", 401));
    }
    //Grand acess to protected routes
    req.user = freshUser;
    next();
});
