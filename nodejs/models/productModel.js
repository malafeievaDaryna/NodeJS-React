const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number
});

const product = mongoose.model('product', productSchema);

module.exports = product;