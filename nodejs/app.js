const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
///const RedisStore = require('connect-redis')(session);
const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const config = require('./config');
const configValues = require('./config/config.json');
const setupController = require('./controllers/setupController');
const productControllerAPI = require('./controllers/productController');
const cors = require('cors');
const user = require('./models/userModel');
require('./services/cacher');

const port = 8080;
const app = express();

/// inject apollo graphql service
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync('./graphql/schema.graphql', {encoding: 'utf-8'}));
const resolvers = require('./graphql/resolvers');
const context = ( {req} ) => ( {sessionID: req.sessionID, user: req.user} );
const apolloServer = new ApolloServer({typeDefs, resolvers, context});
/// Required logic for integrating with Express
apolloServer.start().then( () => {
    console.log('graphql service is available with "/graphql" postfix');
    apolloServer.applyMiddleware({app, path: '/graphql'});
}).catch( err => {
    console.log(' graphql service failed');
    throw err;
});


/// grant the access to frontend-server
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
/// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
/**
    // Website you wish to allow to connect by manual way
app.all('/*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
*/

// facilitate parsing http input
app.use(bodyparser.json())
//body text type expected with pairs key-value
app.use(bodyparser.urlencoded({extended:false}))
app.use(session({
    secret:'cookieKey'+uuidv4(),
    resave: false,
    saveUninitialized: true,
    //store: new RedisStore({ host: configValues.redis.host, port: configValues.redis.port, client: getRedisClient()}),
    cookie: { 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 // 24 hours 
    },
    genid: function(req) {
      const id = uuidv4()
      console.log('session id created ', id);
      return id;
    }
}));

app.post('/login', async (req, res) => {
    const {email, pass} = req.body;
    console.log("login for " + email)
    const result = await user.findOne({email: email, pass: pass}).exec();
    if(!result){
        res.sendStatus(401);
        return;
    } else {
        console.log("login succeeded for " + result.email)
        const token = jwt.sign({ user: result }, configValues.jwt.secret);
        res.send({token});
    }
});

app.use('/', function (req, res, next) {
    console.log(" authorization triggered ");
    if (req.headers.authorization) {
        jwt.verify(
          req.headers.authorization.split(' ')[1],
          configValues.jwt.secret,
          (err, {user}) => {
            if(err){
               console.log("err ", err);
            }
            else if (user) {
               console.log("payload ", user);
               req.user = user;
            }
          }
        )
    }
    
    next();
})

mongoose.connect(config.getDbConnectionString()).then( () => {
    console.log("mongo has been connected on host :", config.getDbConnectionString());
}).catch( (err) => {
    console.error("Error while connecting to MongoDB");
    throw err;
});
//uncomment for first time initialization
//setupController(app);

app.use('/assets', express.static(__dirname + '/public'));
app.use('/api/products', productControllerAPI);

console.log("server is waiting for connection on port :", port)
app.listen(port);