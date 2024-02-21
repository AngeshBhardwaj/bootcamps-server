const errorHandler = (err, req, res, next) => {
    // Log error details for DEV
    console.error(`${err.stack}`.red);

    // send the response
    res.status(err.statusCode || 500).json({
        success: false, 
        message: `${err.message}` || `Server error occured.`, 
        data: null
    });

    // Call the next middleware in lifecycle
    next();
}

module.exports = errorHandler