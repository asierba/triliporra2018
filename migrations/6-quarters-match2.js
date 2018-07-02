'use strict';

module.exports.id = "quarters-match2";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 60}, {$set: { "home":"Russia", "away":"Croatia" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
