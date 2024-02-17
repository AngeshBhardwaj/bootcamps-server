const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./middleware/logger')
const connectDB = require('./db/mongoose');

// configure dotenv to read from the config file
dotenv.config({path: './config/config.env'});

// Import routes
const bootcamps = require('./routes/bootcamps');


// Create a new express app
const app = express();

// Connect to DB
connectDB();

// Log requests and other details if it's dev
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// Handle endpoints
const baseRoute = '/api/v1';

// Use Routes
app.use(baseRoute + '/bootcamps', bootcamps);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)});

// Handle unhandled promise rejections. Close the app if error in any promise is not handled.
process.on('unhandledRejection', (err, promise) => {
    console.error(`Error occured: ${err.message}`.red);

    // Close the server and exit the process with error code
    server.close(() => process.exit(1));
});