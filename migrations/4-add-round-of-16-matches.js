'use strict';

module.exports.id = "add-round-of-matches-temp";

module.exports.up = function (done) {
  const updates = [
    this.db.collection('match').updateOne(
      {"id": 49}, {$set: { "home":"France", "away":"Argentina" }}),
    this.db.collection('match').updateOne(
      {"id": 50}, {$set: { "home":"Uruguay", "away":"Portugal" }}),
    this.db.collection('match').updateOne(
      {"id": 51}, {$set: { "home":"Brazil", "away":"Mexico" }}),
    this.db.collection('match').updateOne(
      {"id": 52}, {$set: { "home":"Belgium", "away":"Japan" }}),
    this.db.collection('match').updateOne(
      {"id": 53}, {$set: { "home":"Spain", "away":"Russia" }}),
    this.db.collection('match').updateOne(
      {"id": 54}, {$set: { "home":"Croatia", "away":"Denmark" }}),
    this.db.collection('match').updateOne(
      {"id": 55}, {$set: { "home":"Sweden", "away":"Switzerland" }}),
    this.db.collection('match').updateOne(
      {"id": 56}, {$set: { "home":"Colombia", "away":"England" }}),
  ]

  Promise.all(updates).then(() => done());
};

module.exports.down = function (done) {
  done();
};
