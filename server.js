const express = require('express');
const dotenv = require('dotenv');

// configure dotenv to read from the config file
dotenv.config({path: './config/config.env'});

// Create a new express app
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)});