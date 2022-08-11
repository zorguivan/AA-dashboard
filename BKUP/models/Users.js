const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: false },
    password: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    files: [{
        type: mongoose.Schema.Types.ObjectId, ref: "files",
    }],
    creditCards: [{
        type: mongoose.Schema.Types.ObjectId, ref: "creditCards",
    }],
    services: [{
        type: mongoose.Schema.Types.ObjectId, ref: "services",
    }],
}, {
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Email already in user.' });
module.exports = mongoose.model('User', userSchema)