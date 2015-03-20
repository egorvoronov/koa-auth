// requires
const logger = require('koa-logger');


// middleware
module.exports = function(app) {
    app.use(logger());
};
