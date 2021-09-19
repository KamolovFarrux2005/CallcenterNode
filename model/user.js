const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    number: {
        type: String,
        required: true,
        min: 7,
        max: 11
    },
    location: {
        type: String, 
        required: true, 
        min: 6, 
        max: 20
    },
    data: {type: Date, default: new Date().toLocaleDateString()}
});

const UserModel = mongoose.model('User', newUser);

module.exports = UserModel;
