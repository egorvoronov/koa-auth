// requires
const session = require('koa-generic-session');
const sessionStore = require('app/server/common/sessionStore');
const config = require('app/server/config');
const debug = require('app/server/common/debug')('middleware:session');


// middleware
module.exports = function(app) {

    app.keys = [config.session.secret];
    debug(app.keys);

    app.use(session({
        prefix: config.session.prefix,
        key: config.session.key,
        store: sessionStore
    }));

};
