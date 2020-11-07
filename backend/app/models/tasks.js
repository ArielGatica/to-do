const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskModel = mongoose.model('tasks', new Schema ({
    name: { type: String },
    status: { type: Boolean },
    description: { type: String }
}, { versionKey: false, timestamps: true }));

module.exports = taskModel;