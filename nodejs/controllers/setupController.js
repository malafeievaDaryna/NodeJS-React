const product = require('../models/productModel');
const user = require('../models/userModel');

module.exports = function (app) {

    app.get('/api/setupProducts', function (req, res) {
        //seed database
        const productsItems = [
            
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

    app.get('/api/setupUsers', function (req, res) {
        //seed database
        const usersItems = [
            
            {
                id: 0,
                name: "admin",
                pass: "admin",
                email: "admin@mail.ru",
                is_admin: true
            },
            {
                id: 1,
                name: "user1",
                pass: "user1",
                email: "user1@mail.ru",
                is_admin: false
            }
        ];
        user.create(usersItems, function (err, results) {
            res.send(results);
        });
    });

}
