const product = require('../models/productModel');

const Query = {
    getAllProducts: async (root, context) => {
        const result = await product.find({}).cache({ key: context.sessionID }).exec();
        console.log("GraphQL get all :" + JSON.stringify(result))
        return result;
    },
    getProductById: async (root, {id}, context) => {
        const result = await product.findOne({id: id}).cache({ key: context.sessionID }).exec();
        console.log("GraphQL get by id " + id + " :" + JSON.stringify(result))
        return result;
    }
};

module.exports = { Query };