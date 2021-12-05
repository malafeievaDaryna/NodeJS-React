var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number
});

var product = mongoose.model('product', productSchema);

module.exports = product;