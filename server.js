const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger')

// configure dotenv to read from the config file
dotenv.config({path: './config/config.env'});

// Import routes
const bootcamps = require('./routes/bootcamps');


// Create a new express app
const app = express();

// Log requests and other details if it's dev
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// Handle endpoints
const baseRoute = '/api/v1';

// Use Routes
app.use(baseRoute + '/bootcamps', bootcamps);

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)});