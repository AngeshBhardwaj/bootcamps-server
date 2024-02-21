const errorHandler = (err, req, res, next) => {
    // Log error details for DEV
    console.error(`Error occured while fetching bootcamp by ID: ${err.stack}`.red);

    // send the response
    res.status(400).json({
        success: false, 
        message: `${err.message}`, 
        data: null
    });

    // Call the next middleware in lifecycle
    next();
}

module.exports = errorHandler