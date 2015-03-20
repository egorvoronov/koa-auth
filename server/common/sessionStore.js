const mongooseStore = require('koa-session-mongoose');

var sessionStore = mongooseStore.create({
    model: 'Session'
});

module.exports = sessionStore;