const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://pokaljainam:12345@cluster0.7ui20.mongodb.net/Movie-project");
        console.log("Database connected successfully...");
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = db;