var product = require('../models/productModel');

module.exports = function (app) {

    app.get('/api/setupProducts', function (req, res) {
        //seed database
        var productsItems = [
            
            {
                id: 0,
                name: "iPhone 13",
                desc: "good",
                price: 1100.0
            },
            {
                id: 0,
                name: "Samsung Galaxy",
                desc: "good",
                price: 900.50
            }
        ];
        product.create(productsItems, function (err, results) {
            res.send(results);
        });
    });

}
