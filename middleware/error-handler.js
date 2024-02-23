const ErrorResponse = require('../utils/error-response');

const errorHandler = (err, req, res, next) => {
    // Log error details for DEV
    console.error(err);     // logs the entire object, generally used when logging in log files.
    console.error(`${err.stack}`.red);

    // use 'spread operator' to get a clone of actual err object with properties
    let error = { ...err }; 
    error.message = err.message;

    // Mongoose Bad ObjectId
    if(err.name === 'CastError') {
        const message = `Cast to ObjectId failed for value: ${err.value}`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate key value entered. An entry with ${JSON.stringify(err.keyValue)} already exists.`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(e => e.message);
        error = new ErrorResponse(message, 400);
    }

    // send the response
    res.status(error.statusCode || 500).json({
        success: false, 
        message: `${error.message}` || `Server error occured.`, 
        data: null
    });

    // Call the next middleware in lifecycle
    next();
}

module.exports = errorHandler