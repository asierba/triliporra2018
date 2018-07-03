'use strict';

module.exports.id = "convert-score-to-number-v2";

module.exports.up = function (done) {
  const db = this.db;
  const cursor = this.db.collection('match')
      .find({ $or: [
          {'score.home' : { $type : 2 }},
          {'score.away' : { $type : 2 }}
          ]});

  run(cursor, done, db);
};

function run(cursor, done, db) {
  cursor.hasNext().then(hasNext => {
    if(!hasNext) {
      done();
      return;
    }

    cursor.next().then(match => {
      match.score.home = Number(match.score.home);
      match.score.away = Number(match.score.away);
      db.collection('match').save(match);
      run(cursor, done,db);
    });
  })
}

module.exports.down = function (done) {
  done();
};
