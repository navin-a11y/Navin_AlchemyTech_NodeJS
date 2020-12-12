const appError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  
  const sendErrorProd = (err, res) => {
    // operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // programming or other unknown error
    } else {
      console.log("Error!!", err);

      res.status(500).json({
        status: err,
        message: "something went wrong",
      });
    }
  };
  
  module.exports = (err,req,res,next) => {
  
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "error";

      if(process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);

    } else if (process.env.NODE_ENV === "production") {
      let error = { ...err };
      if(err.code==11000){
         err = duplicateError(err);
      }
          sendErrorProd(err, res);
      }
  };

  function duplicateError(err){
    return new appError(`${err.keyValue.email} already exists`, 400);
  }