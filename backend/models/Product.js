const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true, unique: true },
    features: { type: String },
    price: { type: Number, required: true },
    keywords: { type: String },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);