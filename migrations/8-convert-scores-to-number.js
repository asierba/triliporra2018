'use strict';

module.exports.id = "convert-score-to-number";

module.exports.up = function (done) {
  const db = this.db;
  this.db.collection('match')
    .find({ 'score.home' : { $type : 2 } })
    .forEach(function(x) {
      x.score.home = Number(x.score.home);
      db.collection('match').save(x);
    });

  this.db.collection('match')
    .find({ 'score.away' : { $type : 2 } })
    .forEach(function(x) {
      x.score.away = Number(x.score.away);
      db.collection('match').save(x);
    });

  done();
};

module.exports.down = function (done) {
  done();
};
