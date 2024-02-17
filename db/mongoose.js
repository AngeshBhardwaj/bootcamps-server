const mongoose = require('mongoose');

// for promises, instead of .then() let's use async/await
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connected to server: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;