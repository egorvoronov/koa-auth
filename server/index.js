// Initializing
require('app/server/init');

// Koa
const koa = require('koa');
const app = koa();

// Middlewares
const requireMiddleware = require('app/server/middlewares/require')(app);

// Catching all errors in one place
requireMiddleware('catchErrors');

// Activating logger
requireMiddleware('logger');

// Sending favicon
requireMiddleware('favicon');

// Sending static
requireMiddleware('serve');

// Sessions
requireMiddleware('session');

// Authentication
requireMiddleware('authentication');

// Jade middleware
requireMiddleware('jade');

// Routing
requireMiddleware('routing');

// Export server app or start server
module.exports = app;
