
var flash = require('connect-flash')
  , mongoose = require('mongoose')
  , express = require('express')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')
  , session = require('express-session')
  , morgan = require('morgan')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var port     = process.env.PORT || 3000; // set our port
  

// var users = [
//   { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
//   , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
//   , { id: 3, username: 'aa', password: 'aaa', email: 'aaa' }
// ];

// Configure passport
require('./models/account');

var Account = mongoose.model( 'account' );

Account.find( function ( err, users, count ){
  console.dir(users.length)
  function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
      fn(null, users[idx]);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  }

  function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return fn(null, user);
      }
    }
    return fn(null, null);
  }


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.nid);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: '沒有此帳號 ' + username }); }
        if (user.password != password) { return done(null, false, { message: '密碼錯誤' }); }
        return done(null, user);
      })
    });
  }
));




var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.Router());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.get('/register', function(req, res){
  res.render('register', { user: req.user, message: req.flash('error') });
});
app.post('/register', function(req, res) {
  new Account({ 
    username : req.body.username,
    nid         : users.length+1,
    username    : req.body.username,
    password    : req.body.password,
    email    : req.body.email,
    updated_at : new Date()
  }).save(function ( err, todo, count ) {
    if (err) {
      return res.render('register', { account : account });
    }

    res.redirect('/');
  });
});
// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/');
  });
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('web start listen ' + port);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
});