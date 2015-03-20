// requires
const serve = require('koa-static');
const config = require('app/server/config');
const mount = require('koa-mount');

module.exports = function(app) {
  app.use(mount('/assets', serve(config.public)));
};
