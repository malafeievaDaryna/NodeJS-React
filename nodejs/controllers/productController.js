const express = require('express');
const product = require('../models/productModel');

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await product.find({}).exec();
    console.log("get all " + JSON.stringify(result))
    res.send(result);
})

router.get("/:id", async (req, res) => {
    const result = await product.findOne({id: req.params.id}).exec();
    res.send(result);
})

router.post("/", async (req, res) => {
    let item = req.body;
    item.id = await product.countDocuments({}).exec();
    console.log("going to be created " + JSON.stringify(item))

    product.create(item, function (err, results) {
        res.send(results);
    });
})

//TODO put for updating

module.exports = router;