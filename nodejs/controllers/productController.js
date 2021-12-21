const express = require('express');
const product = require('../models/productModel');
const cleanCache = require('../middleware/cleanCache');

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("req.session " + req.sessionID)
    const result = await product.find({}).cache({ key: req.sessionID }).exec();
    console.log("get all " + JSON.stringify(result))
    res.send(result);
})

router.get("/:id", async (req, res) => {
    console.log("req.session " + req.sessionID)
    const result = await product.findOne({id: req.params.id}).cache({ key: req.sessionID }).exec();
    res.send(result);
})

router.post("/", cleanCache, async (req, res) => {
    let item = req.body;
    item.id = await product.countDocuments({}).exec();
    console.log("going to be created " + JSON.stringify(item))

    product.create(item, function (err, results) {
        if(err){
            res.send(400, err);
        } else {
            res.send(results);
        }

    });
})

//TODO put for updating

module.exports = router;