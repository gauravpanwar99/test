var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var expressMessages = require('express-messages');
var connectFlash = require('connect-flash');


// Connect to DB
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('Database Connected');
})

//Init App
var app = express();

app.use(connectFlash());
app.use(expressValidator()); 
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public Folder
app.use(express.static(path.join(__dirname, 'public')));


// Set Global Error Variables
app.locals.errors = null;


//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Express Session Middleware
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));
// Express validator middleware



app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Set Routes
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');

app.use('/', pages);
app.use('/admin/pages', adminPages);


var port = '3000';
app.listen(port, function (req, res) {
    console.log('Server is running on port ' + port);
});