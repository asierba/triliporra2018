'use strict';

module.exports.id = "semis-match1";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 61}, {$set: { "home":"France", "away":"Belgium" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
