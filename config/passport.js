var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  var errors = [];
  if(!validator.isEmail(req.body.email)) {
    errors.push('Invalid Email')
  }
  
  // Una mayuscula, una minuscula y un numero
  var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  if(!validator.matches(req.body.password, pattern)) {
    errors.push('Invalid Password');
  }
  
  if(errors.length > 0) {
    return done(null, false, req.flash('error', errors))
  }
  
  User.findOne({ 'email': email }, function(err, user) {
    if(err) {
      return done(err);
    }
    if(user) {
      return done(null, false, {
        message: 'Email already in use'
      });
    }
    
    var newUser = User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result) {
      if(err) {
        return done(err)
      }
      return done(null, newUser); 
    });
  });
}));

passport.use('local.signin' , new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  var errors = [];
  if(!validator.isEmail(req.body.email)) {
    errors.push('Invalid Email')
  }
  
  if(errors.length > 0) {
    return done(null, false, req.flash('error', errors))
  }
  
  User.findOne({ 'email': email }, function(err, user) {
    
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, {
        message: 'No user found.'
      });
    }
    
    if(!user.validPassword(password)) {
      return done(null, false, {
        message: 'Wrong password.'
      });
    }
    
    return done(null, user); 
  });
}));