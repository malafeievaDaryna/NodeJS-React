var express = require('express');
var product = require('../models/productModel');

var router = express.Router();

router.get("/:id", (req, res) => {
    product.find({id: req.params.id}, function (err, results) {
        res.send(results);
    });
})

module.exports = router;