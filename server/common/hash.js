const crypto = require('crypto');

// warning, takes time, about ~70ms for length=128, iterations=12000
exports.createHashSlow = function(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 128);
};

exports.createSalt = function() {
  return crypto.randomBytes(128).toString('base64');
};
