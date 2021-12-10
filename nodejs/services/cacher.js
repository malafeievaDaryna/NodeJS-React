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

mongoose.Query.prototype.exec = async function(){
    console.log("I'm cacher injection");
    const key = JSON.stringify(
        Object.assign({}, 
            this.getQuery(), { collection: this.mongooseCollection.name}
        ));
    console.log(key);

    const cachedValue = await redisClient.get(key);
    if(cachedValue){
        console.log(`cachedValue is available: ${cachedValue}`);
        const doc = JSON.parse(cachedValue);

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await originExec.apply(this, arguments);
    if(result){
        redisClient.set(key, JSON.stringify(result));
    }

    return result;
};

