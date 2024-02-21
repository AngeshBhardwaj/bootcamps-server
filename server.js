const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./middleware/logger')
const connectDB = require('./db/mongoose');
const errorHandler = require('./middleware/error-handler')

// configure dotenv to read from the config file
dotenv.config({path: './config/config.env'});

// Import routes
const bootcamps = require('./routes/bootcamps');


// Connect to DB
connectDB();

// Create a new express app
const app = express();

// Body parser, without this req.body is not available
app.use(express.json());

// Log requests and other details if it's dev
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// Handle endpoints by using Routes and errors by error handler
const baseRoute = '/api/v1';
app.use(baseRoute + '/bootcamps', bootcamps);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)});

// Handle unhandled promise rejections. Close the app if error in any promise is not handled.
process.on('unhandledRejection', (err, promise) => {
    console.error(`Error occured: ${err.message}`.red);

    // Close the server and exit the process with error code
    server.close(() => process.exit(1));
});