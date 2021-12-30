const mongoose = require("mongoose");
const redis = require("redis");
const configValues = require('../config/config.json');

let redisClient;
(async () => {

    console.log("redis being connected on host :", configValues.redis.host, " port ", configValues.redis.port)

    redisClient = redis.createClient({
        url: `redis://@${configValues.redis.host}:${configValues.redis.port}`
      });
  
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
  
    await redisClient.connect();
    
})();

const originExec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function( options = {} ) {
    this.useCache = true;
    this.hashKey = JSON.stringify( options.key || '' );

    return this;
}

mongoose.Query.prototype.exec = async function(){
    if(!this.useCache){
        return originExec.apply(this, arguments);
    }

    console.log("I'm cacher injection");
    const key = JSON.stringify(
        Object.assign({}, 
            this.getQuery(), { collection: this.mongooseCollection.name}
        ));
    console.log(key);

    const cachedValue = await redisClient.hGet(this.hashKey, key);
    if(cachedValue){
        console.log(`cachedValue is available: ${cachedValue}`);
        const doc = JSON.parse(cachedValue);

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await originExec.apply(this, arguments);
    if(result){
        redisClient.hSet(this.hashKey, key, JSON.stringify(result));
    }

    return result;
};

module.exports = {
    clearHash(cacheKey){
        console.log("cache clearing " + cacheKey);
        redisClient.del(JSON.stringify(cacheKey));
    }
}

