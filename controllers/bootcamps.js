
/**
 * @desc    Get the list of All the bootcamps
 * @route   GET '/api/v1/bootcamps'
 * @access  Public
 */
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, message: `List of all the bootcamps - To be implemented.`, data: null});
}


/**
 * @desc    Get the bootcamp by id
 * @route   GET '/api/v1/bootcamps/:id'
 * @access  Public
 */
exports.getBootcampById = (req, res, next) => {
    res.status(200).json({success: true, message: `Get the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
}


/**
 * @desc    Create a new Bootcamp
 * @route   POST '/api/v1/bootcamps'
 * @access  [Admin, Owner]
 */
exports.createBootcamp = (req, res, next) => {
    res.status(201).json({success: true, message: `Create a new bootcamp - To be implemented.`, data: null});
}


/**
 * @desc    Update the bootcamp by id
 * @route   PUT '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.updateBootcampById = (req, res, next) => {
    res.status(200).json({success: true, message: `Update the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
}


/**
 * @desc    Delete the bootcamp by id
 * @route   DELETE '/api/v1/bootcamps/:id'
 * @access  [Admin, Owner]
 */
exports.deleteBootcampById = (req, res, next) => {
    res.status(200).json({success: true, message: `Delete the bootcamp with id ${req.params.id} - To be implemented.`, data: null});
}
