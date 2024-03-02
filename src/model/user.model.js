const mongoose = require('mongoose');
const collection = 'users';

const shcmea = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    age: Number,
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'}
});

const userModel =  mongoose.model(collection, shcmea);
module.exports = userModel;