const app = require('app/server');
const config = require('app/server/config');
const debug = require('app/server/common/debug')('www');

if (!module.parent) {
  startServer();
}

module.exports = function (incomingCallback) {
  startServer(incomingCallback);
};

function startServer(incomingCallback) {
  var callbackAfterServerStarts;

  function defaultCallbackAfterServerStarts() {
    debug("Server listening on port " + config.port);
  }

  if (incomingCallback) {
    callbackAfterServerStarts = function() {
      defaultCallbackAfterServerStarts();
      incomingCallback();
    };
  } else {
    callbackAfterServerStarts = function() {
      defaultCallbackAfterServerStarts();
    };
  }


  app.listen(config.port, callbackAfterServerStarts);
}
