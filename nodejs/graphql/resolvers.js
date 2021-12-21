const product = require('../models/productModel');

const Query = {
    getAllProducts: async (root) => {
        const result = await product.find({}).exec();
        console.log("GraphQL get all :" + JSON.stringify(result))
        return result;
    },
    getProductById: async (root, {id}) => {
        const result = await product.findOne({id: id}).exec();
        console.log("GraphQL get by id " + id + " :" + JSON.stringify(result))
        return result;
    }
};

module.exports = { Query };