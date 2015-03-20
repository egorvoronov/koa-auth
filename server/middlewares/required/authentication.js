// requires
const passport = require('koa-passport');


// middleware
module.exports = function(app) {

    app.use(function* cleanEmptySessionPassport(next) {
        yield* next;
        if (Object.keys(this.session.passport).length === 0) {
            delete this.session.passport;
        }
    });

    app.use(passport.initialize());

    app.use(passport.session());


};