const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = async() =>{
    await mongoose.connect(config.dev.MONGO_URI, {
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}

module.exports = { connectDB };