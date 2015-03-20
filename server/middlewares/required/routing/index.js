// requires
const router = require('koa-router');
const routes = require('app/server/middlewares/required/routing/routes');
const checkUser = require('app/server/middlewares/plain/checkUser');
const postBodyParser = require('app/server/middlewares/plain/postBodyParser');

// middleware
module.exports = function (app) {

  app.use(router(app));

  // Frontpage
  app.get('/', checkUser, routes.frontpage.show);

  // Auth
  // register
  app.get('/register', routes.auth.register.get);
  app.post('/register', postBodyParser, routes.auth.register.post);

  // login
  app.get('/login', routes.auth.login.get);
  app.post('/login', postBodyParser, routes.auth.login.post);

  // logout
  app.post('/logout', postBodyParser, routes.auth.logout.post);

};
