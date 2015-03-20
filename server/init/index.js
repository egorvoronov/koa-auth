const config = require('app/server/config');

// Set stackTraceLimit
Error.stackTraceLimit = config.stackTraceLimit || 25;

// Avoid Node core noise
require('clarify');

// API for initialization phase
module.exports = function(options) {
  var options = options || {};
};
