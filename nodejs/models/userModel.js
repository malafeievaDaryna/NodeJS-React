const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    pass: String,
    email: String,
    is_admin: Boolean
});

const user = mongoose.model('user', userSchema);

module.exports = user;