// INITIAL VARS
var express = require('express');
var app = express();
//var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');
var mongoose = require('mongoose');


var defaultModel = require('./models/default.js');

// ROUTES
var index = require('./routes/index.js');

// DATABASE VARS
var mongoURI =    process.env.MONGODB_URI ||
   process.env.MONGOHQ_URL ||
   "mongodb://localhost/duplexdb";
var mongoDB = mongoose.connect(mongoURI).connection;
var defaultsExist = null;

    // DATABASE SETUP
    mongoDB.on('error', function(err){
        console.log('Mongo connection: ', err);
    });
    mongoDB.once('open', function(err){
        if(!err) {console.log('Mongo connection open');}
        else if(err) {console.log('There was an error opening Mongo connection: ', err);}
    });
/************* THIS CODE DOES THE ACTUAL DB CHECK FOR EXISTING COLLECTIONS *****************/
    var conn = mongoose.createConnection(mongoURI);
    conn.on('open', function(){
    conn.db.listCollections().toArray(function(err, names){
        if(names.length==0){
            defaultsExist = false;
        }else{
            defaultsExist = true;
        }
        conn.close();
    });
});
/*******************************************************************************************/

// SET PORT
app.set('port', (process.env.PORT) || 4000);

// SET MIDDLEWARE
app.use(session({
    saveUninitialized: true,
    secret: 'secret',
    key: 'user',
    resave: true,
    s: false,
    cookie: {maxAge: null, secure: true}
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSION
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    Admin.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
    },
    function(req, username, password, done){
        Admin.findOne({username: username}, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false);
            }
            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }else{
                    done(null, false);
                }
            });
        });
    }
));

// CALL CATCHES
app.get('/checkDB', function(req, res){
    console.log('defaultsExist =', defaultsExist);
    res.send(defaultsExist);
});
app.use('/reg', register);
app.use('/defaults', default_value);
app.use('/submit', submit);
app.use('/admin', admin);
app.use('/', index);

// LISTENER
app.listen(app.get('port'), function(){
    console.log('Listening on port #', app.get('port'));
});

module.export = app;
