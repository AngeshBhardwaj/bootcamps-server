const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({success: true, message: `List of all the bootcamps - To be implemented.`, data: null});
});

router.get('/:id', (req, res) => {
    res.status(200).json({success: true, message: `Get the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

router.post('/', (req, res) => {
    res.status(201).json({success: true, message: `Create a new bootcamp - To be implemented.`, data: null});
});

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, message: `Update the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({success: true, message: `Delete the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
});

module.exports = router;