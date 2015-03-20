const path = require('path');

module.exports = function(app) {
    return function(middlewareName) {
        require('app/server/middlewares/required/' + middlewareName)(app);
    };
};
