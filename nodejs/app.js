const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const setupController = require('./controllers/setupController');
const productControllerAPI = require('./controllers/productController');
const port = 8080;
const cors = require('cors');

require('./services/cacher');

// grant the access to frontend-server
// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
/*
    // Website you wish to allow to connect
app.all('/*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
*/

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyparser.json())
//body text type expected with pairs key-value
app.use(bodyparser.urlencoded({extended:false}))

console.log("mongo being connected on host :", config.getDbConnectionString())
mongoose.connect(config.getDbConnectionString());
//uncomment for first time initialization
//setupController(app);

app.use('/assets', express.static(__dirname + '/public'));
app.use('/api/products', productControllerAPI);

console.log("server is waiting for connection on port :", port)
app.listen(port);