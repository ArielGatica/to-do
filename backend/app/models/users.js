const mongoose = require('mongoose');
const { Schema } = mongoose;

const userModel = mongoose.model('users', new Schema ({
    name: { type: String },
    username: { type: String },
    password: { type: String }
}, { versionKey: false, timestamps: true }));

module.exports = userModel;