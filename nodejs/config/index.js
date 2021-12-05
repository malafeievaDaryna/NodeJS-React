var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return "mongodb+srv://" + configValues.uname + ":" + configValues.pwd + "@cluster0.0m1df.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    }
}