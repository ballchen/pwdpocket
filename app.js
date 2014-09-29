var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var pwd_api = require('./routes/pwd_api');

var local = require('./local');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore(local.session.redis),
    secret: 'kenisgood',
    saveUninitialized: true,
    resave: true,
    cookie: {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

// cdn
var CDN = require('express-cdn')(app, local.cdn);

app.locals = {
    CDN: CDN()
};

app.use('/', routes);


app.post('/pwd/create', pwd_api.);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
