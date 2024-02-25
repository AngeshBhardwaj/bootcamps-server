const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load config file
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {});

// Read JSON data files, notice 'readFileSync' is used as we don't need the async one here.
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import data into DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		console.log('Data imported to DB...'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit();
	}
};

// Delete All data from DB
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		console.log('Data deleted from DB...'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit();
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
} else {
	console.log(
		'Please pass a valid option. The options are:\n\t-i\tImport Data\n\t-d\tDestroy/Delete all data.'
	);
	process.exit();
}
