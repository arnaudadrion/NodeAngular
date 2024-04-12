const Product = require('../models/Product');

exports.list = (req, res, next) => {
    Product.find({}).then(
        (products) => {
            res.status(200).json(products);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};