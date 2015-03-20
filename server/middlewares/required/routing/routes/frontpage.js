var path = require('path');

exports.show = function* () {
    yield this.render('frontpage/index', {}, true);
};
