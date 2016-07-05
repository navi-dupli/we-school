// index.js/server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');
var app = express();
var logger = require('express-logger');

//var morgan       = require('morgan'); // Module to create logfile
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js'); // location of the configured DB url

// CONFIGURATION ===============================================================
// connect to our database
mongoose.connect(configDB.url,
        { server: { auto_reconnect: true } }, function(err, db) {
        	console.log("DASDS " + err  + " ");
        	console.log('Conectado con éxito a la BD');
});


app.use(logger({path: "./logs/logfile.txt"})); // log every request to the console

var fs = require('fs.extra');
var busboy = require('connect-busboy');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret')); // read cookies (needed for auth)

app.use(flash()); // use connect-flash for flash messages stored in session
app.use(busboy());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(cookieParser('secretString'));


// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/routesRecipe.js')(app);
require('./app/routesSubject.js')(app);
require('./app/routesUser.js')(app);
require('./app/routesCourse.js')(app);
require('./app/routesGrade.js')(app);
require('./app/routesAchievement.js')(app);
require('./app/routesActivity.js')(app);
require('./app/front/routes.js')(app);
require('./app/front/routes.js')(app);
//run aplication
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

// launch ======================================================================
app.listen(app.get('port'), function() {
  console.log('Aplicación ejecutándose en el puerto ', app.get('port'));
});