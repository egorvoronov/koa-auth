exports.post = function* () {
    this.logout();
    this.status = 200;
    this.body = {message: 'ok'};
};