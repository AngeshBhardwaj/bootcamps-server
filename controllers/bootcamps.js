const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

/**
 * @desc    Get the list of All the bootcamps
 * @route   GET '/api/v1/bootcamps'
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find();
	res.status(200).json({
		success: true,
		message: `List fetched successfully.`,
		count: bootcamps.length,
		data: bootcamps,
	});
});

/**
 * @desc    Get the list of All bootcamps within a radius
 * @route   GET '/api/v1/bootcamps/radius/:zipcode/:distance'
 * @access  Public
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	// Pull out the params
	const { zipcode, distance } = req.params;

	// get the lat & lng from zipcode using geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	// Calculate the radius using 'radians'. lets assume the user specified distance in miles.
	// Divide distance by radius of Earth
	// Earth radius = 3963 mi / 6378 Km
	const radius = distance / 3963;

	// Get the bootcamps within the radius
	// https://www.mongodb.com/docs/manual/reference/operator/query/centerSphere/
	const bootcamps = await Bootcamp.find({
		location: {
			$geoWithin: { $centerSphere: [[lng, lat], radius] },
		},
	});
	res.status(200).json({
		success: true,
		message: `List fetched successfully.`,
		count: bootcamps.length,
		data: bootcamps,
	});
});

/**
 * @desc    Get the bootcamp by id
 * @route   GET '/api/v1/bootcamps/:id'
 * @access  Public
 */
exports.getBootcampById = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);

	// if fetched bootcamp is null, this means the entry doesn't exists.
	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp with id ${req.params.id} does not exists.`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		message: `Bootcamp with id ${req.params.id} fetched successfully.`,
		data: bootcamp,
	});
});

/**
 * @desc    Create a new Bootcamp
 * @route   POST '/api/v1/bootcamps'
 * @access  [Admin, Owner]
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const newBootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		success: true,
		message: `New bootcamp was created successfully.`,
		data: newBootcamp,
	});
});

/**
 * @desc    Update the bootcamp by id
 * @route   PUT '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
	const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	// if fetched bootcamp is null, this means the entry doesn't exists.
	if (!updatedBootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp with id ${req.params.id} does not exists.`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		message: `Bootcamp with id ${req.params.id} updated.`,
		data: updatedBootcamp,
	});
});

/**
 * @desc    Delete the bootcamp by id
 * @route   DELETE '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
	const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

	// if fetched bootcamp is null, this means the entry doesn't exists.
	if (!deletedBootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp with id ${req.params.id} does not exists.`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		message: `Bootcamp with id ${req.params.id} was DELETED successfully.`,
		data: deletedBootcamp,
	});
});
