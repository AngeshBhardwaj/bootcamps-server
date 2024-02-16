const morgan = require('morgan');

// // Custom middleware to inject data and log request details
// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     req.user = {id: 1, name: 'Will Smith'};
//     next();
// }

const logger = morgan('dev');

module.exports = logger;
