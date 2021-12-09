const mongoose = require("mongoose");
const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();
  
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
        console.log(cachedValue);
        return JSON.parse(cachedValue);
    }

    const result = await originExec.apply(this, arguments);
    if(result){
        redisClient.set(key, JSON.stringify(result));
    }

    return "ddd";//result;
};

