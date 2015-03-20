const path = require('path');
const debug = require('app/server/common/debug')('route:login');

exports.get = function* () {
  yield this.render(path.join('auth', 'index'), {
      title: 'Login',
      buttonName: 'Log In',
      action: '/login'
    },
    true);
};

var passport = require('app/server/common/passport');

exports.post = function*(next) {
  var ctx = this;

  // only callback-form of authenticate allows to assign ctx.body=info if 401
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.body = info;
    } else {
      yield ctx.login(user);
      ctx.body = "";
    }
  }).call(this, next);
};

