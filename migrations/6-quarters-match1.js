'use strict';

module.exports.id = "quarters-match1";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 57}, {$set: { "home":"Uruguay", "away":"France" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
