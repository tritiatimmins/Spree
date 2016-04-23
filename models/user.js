var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//define model
var userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String

});

//on save hook encrypted password
userSchema.pre('save', function(next) {
  //gets access to the user model
  var user = this;

  //generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    //hash(encrypt) our pw using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      //next save the model
      next();
    });
  });
});

//compare stored password and candidate password
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

//create the model class
module.exports = mongoose.model('User', userSchema);
