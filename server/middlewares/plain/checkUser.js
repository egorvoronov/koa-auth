const HttpError = require('app/server/common/error').HttpError;
const debug = require('app/server/common/debug')('middleware:checkUser');

module.exports = function *(next) {

  debug('checkUserMiddleware is here')

  if (!this.passport.user) {
    throw new HttpError(401, "You are not authorized");
  }

  yield* next;

};
