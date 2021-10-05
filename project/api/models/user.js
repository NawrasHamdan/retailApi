const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: false, minlength: 2, maxlength: 12 },
    lastName: { type: String, required: false, minlength: 2, maxlength: 12 },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;