const mongoose = require('app/server/db/mongoose');
var hash = require('app/server/common/hash.js');

var schema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String //user may have no password if used facebook to login/register
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;

        if(password) {
            this.salt = hash.createSalt();
            this.hashedPassword = hash.createHashSlow(password, this.salt);
        } else {
            // remove password (unable to login w/ password any more, but can use providers)
            this.salt = undefined;
            this.hashedPassword = undefined;
        }
    })
    .get(function() {
        return this._plainPassword;
    })
;

schema.methods.checkPassword = function(password) {
    if (!password) return false; // empty password means no login by password
    return hash.createHashSlow(password, this.salt) == this.hashedPassword;
};

function prepareLogin(profile) {
    return [profile.provider, profile.id].join(':');
}

var User = mongoose.model("user", schema);
module.exports = User;
