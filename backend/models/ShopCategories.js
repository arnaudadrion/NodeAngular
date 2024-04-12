const mongoose = require('mongoose');

const shopCategoriesSchema = mongoose.Schema({
    list: [ String ]
});

module.exports = mongoose.model('ShopCategories', shopCategoriesSchema);