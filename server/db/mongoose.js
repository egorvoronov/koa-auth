/**
 * This file must be required at least ONCE.
 * After it's done, one can use require('mongoose')
 *
 * In web-app: this is done at init phase
 * In tests: in mocha.opts
 * In gulpfile: in beginning
 */

var mongoose = require('mongoose');
var ValidationError = require('mongoose/lib/error').ValidationError;
var ValidatorError = require('mongoose/lib/error').ValidatorError;

var config = require('app/server/config');
var _ = require('lodash');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

//mongoose.set('debug', true);

// bind context now for thunkify without bind
_.bindAll(mongoose.connection);
_.bindAll(mongoose.connection.db);

// plugin from https://github.com/LearnBoost/mongoose/issues/1859
// yield.. .persist() or .destroy() for generators instead of save/remove
// mongoose 3.10 will not need that (!)
mongoose.plugin(function (schema) {
    schema.methods.persist = function (body) {
        var model = this;

        return function (callback) {
            if (body) model.set(body);
            model.save(function (err, changed) {

                if (err && err.code == 11000) {

                    var indexName = err.message.match(/\$(\w+)/)[1];

                    model.collection.getIndexes(function (err2, indexes) {
                        if (err2) return callback(err);

                        // e.g. [ [displayName, 1], [email, 1] ]
                        var indexInfo = indexes[indexName];


                        // e.g. { displayName: 1, email: 1 }
                        var indexFields = {};
                        indexInfo.forEach(function toObject(item) {
                            indexFields[item[0]] = item[1];
                        });


                        var schemaIndexes = schema.indexes();

                        var schemaIndex = schemaIndexes.find(function (idx) {
                            return _.isEqual(idx[0], indexFields);
                        });

                        // schema index object, e.g
                        // { unique: 1, sparse: 1 ... }
                        var schemaIndexInfo = schemaIndex[1];

                        var errorMessage = schemaIndexInfo.errorMessage || ("Index error: " + indexName);

                        var valError = new ValidationError(err);
                        var field = indexInfo[0][0]; // if many fields in uniq index - we take the 1st one for error
                        valError.errors[field] = new ValidatorError(field, errorMessage, err.err);

                        return callback(valError);
                    });

                } else {
                    callback(err, changed);
                }

            });
        };
    };
    schema.methods.destroy = function () {
        var model = this;

        return function (callback) {
            model.remove(callback);
        };
    };

    schema.statics.destroy = function (query) {
        return function (callback) {
            this.remove(query, callback);
        }.bind(this);
    };
});

module.exports = mongoose;
