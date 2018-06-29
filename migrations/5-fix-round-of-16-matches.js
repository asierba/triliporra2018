'use strict';

module.exports.id = "fix-round-of-matches";

module.exports.up = function (done) {
  const updates = [
    this.db.collection('match').updateOne(
      {"id": 53}, {$set: { "home":"Brazil", "away":"Mexico" }}),
    this.db.collection('match').updateOne(
      {"id": 54}, {$set: { "home":"Belgium", "away":"Japan" }}),
    this.db.collection('match').updateOne(
      {"id": 51}, {$set: { "home":"Spain", "away":"Russia" }}),
    this.db.collection('match').updateOne(
      {"id": 52}, {$set: { "home":"Croatia", "away":"Denmark" }}),
  ]

  Promise.all(updates).then(() => done());
};

module.exports.down = function (done) {
  done();
};
