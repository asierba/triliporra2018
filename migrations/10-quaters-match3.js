'use strict';

module.exports.id = "quarters-match3";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 58}, {$set: { "home":"Brazil", "away":"Belgium" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
