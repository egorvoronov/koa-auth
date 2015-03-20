const mongoose = require('app/server/db/mongoose');
const passport = require('koa-passport');
const co = require('co');
const debug = require('app/server/common/debug')('auth:passport');

const User = require('app/server/models/User');

// user -> id
passport.serializeUser(function (user, done) {
  debug('serializing User: ', user);
  done(null, user.id);
});
// id -> user
passport.deserializeUser(function (id, done) {
  try {
    debug('deserializing user: ', id);
    id = mongoose.Types.ObjectId(id);
  } catch (e) { // CastError = not found
    return done(null, null);
  }

  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Local Strategy
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, function (login, password, done) {

  debug('Local strategy function was invoked');

  if (!login) return done(null, false, {message: 'Provide your email, please'});
  if (!password) return done(null, false, {message: 'Provide your password, please'});

  co(function*() {
    var user = yield User.findOne({login: login}).exec();
    debug('User was found: ', user);

    if (!user) {
      return done(null, false, {message: 'User was not be found'});
    }

    if (!user.checkPassword(password)) {
      return done(null, false, {message: 'Password is incorrect'});
    }

    done(null, user);

  }).catch(function (err) {

    debug('Error occured when local strategy was invoked');
    if (err) done(err);

  });

}));

module.exports = passport;
