var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

//create local strategy
var localOptions = {usernameField: 'username'};
var localLogin = new LocalStrategy(localOptions, function (username, password, done) {
  //Verify this username and password, call done with the user
  User.findOne({ username: username }, function(err, user) {
    if (err) { return err; }
    if (!user) { return done(null, false); }

    //compare passwords - is password equal to user.password?
    //if it is the correct username and password
    //else call done with false
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return err(done); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

//set up options for jwt strategy
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create jwt strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    
    //if we find a user
    if (user) {
      done(null, user);
    //if we dont find a user
    } else {
      done(null, false);
    }
  });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);