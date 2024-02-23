const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response');


/**
 * @desc    Get the list of All the bootcamps
 * @route   GET '/api/v1/bootcamps'
 * @access  Public
 */
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, message: `List fetched successfully.`, count: bootcamps.length, data: bootcamps});
    } catch (err) {
        next(err);
    }
    
}


/**
 * @desc    Get the bootcamp by id
 * @route   GET '/api/v1/bootcamps/:id'
 * @access  Public
 */
exports.getBootcampById = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        // if fetched bootcamp is null, this means the entry doesn't exists.
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp with id ${req.params.id} does not exists.`, 404)
                );
        }
        res.status(200).json({success: true, message: `Bootcamp with id ${req.params.id} fetched successfully.`, data: bootcamp});
    } catch (err) {
        next(err);
    }
}


/**
 * @desc    Create a new Bootcamp
 * @route   POST '/api/v1/bootcamps'
 * @access  [Admin, Owner]
 */
exports.createBootcamp = async (req, res, next) => {
    try {
        const newBootcamp = await Bootcamp.create(req.body);
        res.status(201).json({success: true, message: `New bootcamp was created successfully.`, data: newBootcamp});  
    } catch (err) {
        next(err);
    }
}


/**
 * @desc    Update the bootcamp by id
 * @route   PUT '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.updateBootcampById = async (req, res, next) => {
    try {
        const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        // if fetched bootcamp is null, this means the entry doesn't exists.
        if (!updatedBootcamp) {
            return next(
                new ErrorResponse(`Bootcamp with id ${req.params.id} does not exists.`, 404)
                );
        }
        res.status(200).json({success: true, message: `Bootcamp with id ${req.params.id} updated.`, data: updatedBootcamp});
    } catch (err) {
        next(err);
    }
}


/**
 * @desc    Delete the bootcamp by id
 * @route   DELETE '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.deleteBootcampById = async (req, res, next) => {
    try {
        const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        // if fetched bootcamp is null, this means the entry doesn't exists.
        if (!deletedBootcamp) {
            return next(
                new ErrorResponse(`Bootcamp with id ${req.params.id} does not exists.`, 404)
                );
        }
        res.status(200).json({success: true, message: `Bootcamp with id ${req.params.id} was DELETED successfully.`, data: deletedBootcamp});
    } catch (err) {
        next(err);
    }
    
}
