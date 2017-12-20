var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport')
    authenticate = require("../utils/authenticate");



module.exports = function () {
    var app = express();
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static('./public'));
    //app.use(authenticate);
   require("../app/routes")(app);

    
    return app;
};