'use strict';

module.exports.id = "quarters-match4";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 59}, {$set: { "home":"Sweden", "away":"England" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
