'use strict';

module.exports.id = "fix-group-f-matches";

module.exports.up = function (done) {
    this.db.collection('match')
      .updateOne(
        {"id": 29},
        {$set: {"stage":"Group F"}})
      .then(() => done());
};

module.exports.down = function (done) {
  done();
};
