const {clearHash} = require('../services/cacher')

module.exports = async ( req, res, next ) => {
    await next();

    clearHash(req.sessionID);
}