'use strict';

module.exports.id = "final";

module.exports.up = function (done) {
  const updates = [
    this.db.collection('match').updateOne(
      {"id": 63}, {$set: { "home":"Belgium", "away":"England" }}),
    this.db.collection('match').updateOne(
      {"id": 64}, {$set: { "home":"France", "away":"Croatia" }}),

  ]

  Promise.all(updates).then(() => done());
};

module.exports.down = function (done) {
  done();
};
