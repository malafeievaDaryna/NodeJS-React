var express = require('express');
var bodyparser = require('body-parser')
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var productControllerAPI = require('./controllers/productController');
var port = /*process.env.PORT ||*/ 8080;
var cors = require('cors');

// grant the access to frontend-server
// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
/*
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
*/
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyparser.json())
//body text type expected with pairs key-value
app.use(bodyparser.urlencoded({extended:false}))

mongoose.connect(config.getDbConnectionString());
//uncomment for first time initialization
//setupController(app);

app.use('/assets', express.static(__dirname + '/public'));
app.use('/api/products', productControllerAPI);

app.listen(port);