'use strict';

module.exports.id = "semis-match2";

module.exports.up = function (done) {
  this.db.collection('match')
    .updateOne({"id": 62}, {$set: { "home":"Croatia", "away":"England" }})
    .then(() => done());
};

module.exports.down = function (done) {
  done();
};
