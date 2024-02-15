const express = require('express');
const dotenv = require('dotenv');

// configure dotenv to read from the config file
dotenv.config({path: './config/config.env'});

// Create a new express app
const app = express();

// Handle endpoints
const baseRoute = '/api/v1';

app.get(baseRoute + '/bootcamps', (req, res) => {
    res.status(200).json({success: true, message: `List of all the bootcamps - To be implemented.`, data: null});
});

app.get(baseRoute + '/bootcamps/:id', (req, res) => {
    res.status(200).json({success: true, message: `Get the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

app.post(baseRoute + '/bootcamps', (req, res) => {
    res.status(201).json({success: true, message: `Create a new bootcamp - To be implemented.`, data: null});
});

app.put(baseRoute + '/bootcamps/:id', (req, res) => {
    res.status(200).json({success: true, message: `Update the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

app.delete(baseRoute + '/bootcamps/:id', (req, res) => {
    res.status(200).json({success: true, message: `Delete the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)});