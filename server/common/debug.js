const pkg = require('app/package.json');

module.exports = function(debugLevel) {
    return require('debug')(pkg.name + ':' + debugLevel);
};