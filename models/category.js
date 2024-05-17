const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: [String],
        required: true
    },
    products: {
        type: [productSchema],
        default: []  // Initialize products as an empty array by default
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
