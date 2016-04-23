var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var config = require('../config');


var tokenForUser = function(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function (req, res, next) {
  //user has already been authenticated
  //they just need a token
  res.send({token: tokenForUser (req.user)}); 
};

exports.signup = function( req, res, next ) {


  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({error: 'please provide a username and password'});
  }

  // see if a user with given username exists
  User.findOne({ username: username}, function(err, existingUser) {
    if (err) { return next(err); }
    
    //if user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({error: 'username is in use' });
    } 

    //if a user with email does NOT exist, create an save user record
    var user = new User ({
      username: username,
      password: password
    });

    //respond to request indicating the user was created
    user.save(function (err) {
      if (err) { return next(err); }
    
      //respond to request indicating the user was created
      //send back an identifying token

      res.json({token: tokenForUser(user)});
    });

  });

};
