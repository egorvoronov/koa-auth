// requires
const path = require('path');
const debug = require('app/server/common/debug')('middleware:catchErrors');

// middleware
module.exports = function (app) {

  app.use(function *(next) {

    try {
      yield* next;
    } catch (e) {
      console.error(e);

      // Not authorized
      if (e.status === 401) {

        var notAuthTpl = path.join('errors', 'notAuthorized');

        yield this.render(notAuthTpl, {
          title: 'You are not authorized'
        }, true);

        return;
      }

      this.body = e.message;
    }

  });


};
