'use strict';

module.exports.id = "initial-matches";

module.exports.up = function (done) {
  this.db.collection('match').insertMany([
    {"id": 1,"date":"2018-06-14T15:00:00.000Z","home":"Russia","away":"Saudi Arabia","stage":"group stage"},

    {"id": 2,"date":"2018-06-15T12:00:00.000Z","home":"Egypt","away":"Uruguay","stage":"group stage"},
    {"id": 3,"date":"2018-06-15T15:00:00.000Z","home":"Morocco","away":"Iran","stage":"group stage"},
    {"id": 4,"date":"2018-06-15T18:00:00.000Z","home":"Portugal","away":"Spain","stage":"group stage"},

    {"id": 5,"date":"2018-06-16T10:00:00.000Z","home":"France","away":"Australia","stage":"group stage"},
    {"id": 6,"date":"2018-06-16T13:00:00.000Z","home":"Argentina","away":"Iceland","stage":"group stage"},
    {"id": 7,"date":"2018-06-16T16:00:00.000Z","home":"Peru","away":"Denmark","stage":"group stage"},
    {"id": 8,"date":"2018-06-16T19:00:00.000Z","home":"Croatia","away":"Nigeria","stage":"group stage"},

    {"id": 9,"date":"2018-06-17T12:00:00.000Z","home":"Costa Rica","away":"Serbia","stage":"group stage"},
    {"id":10,"date":"2018-06-17T15:00:00.000Z","home":"Germany","away":"Mexico","stage":"group stage"},
    {"id":11,"date":"2018-06-17T18:00:00.000Z","home":"Brazil","away":"Switzerland","stage":"group stage"},

    {"id":12,"date":"2018-06-18T12:00:00.000Z","home":"Sweden","away":"Korea Republic","stage":"group stage"},
    {"id":13,"date":"2018-06-18T15:00:00.000Z","home":"Belgium","away":"Panama","stage":"group stage"},
    {"id":14,"date":"2018-06-18T18:00:00.000Z","home":"Tunisia","away":"England","stage":"group stage"},

    {"id":15,"date":"2018-06-19T12:00:00.000Z","home":"Colombia","away":"Japan","stage":"group stage"},
    {"id":16,"date":"2018-06-19T15:00:00.000Z","home":"Poland","away":"Senegal","stage":"group stage"},
    {"id":17,"date":"2018-06-19T18:00:00.000Z","home":"Russia","away":"Egypt","stage":"group stage"},

    {"id":18,"date":"2018-06-20T12:00:00.000Z","home":"Portugal","away":"Morocco","stage":"group stage"},
    {"id":19,"date":"2018-06-20T15:00:00.000Z","home":"Uruguay","away":"Saudi Arabia","stage":"group stage"},
    {"id":20,"date":"2018-06-20T18:00:00.000Z","home":"Iran","away":"Spain","stage":"group stage"},

    {"id":21,"date":"2018-06-21T12:00:00.000Z","home":"Denmark","away":"Australia","stage":"group stage"},
    {"id":22,"date":"2018-06-21T15:00:00.000Z","home":"France","away":"Peru","stage":"group stage"},
    {"id":23,"date":"2018-06-21T18:00:00.000Z","home":"Argentina","away":"Croatia","stage":"group stage"},

    {"id":24,"date":"2018-06-22T12:00:00.000Z","home":"Brazil","away":"Costa Rica","stage":"group stage"},
    {"id":25,"date":"2018-06-22T15:00:00.000Z","home":"Nigeria","away":"Iceland","stage":"group stage"},
    {"id":26,"date":"2018-06-22T18:00:00.000Z","home":"Serbia","away":"Switzerland","stage":"group stage"},

    {"id":27,"date":"2018-06-23T12:00:00.000Z","home":"Belgium","away":"Tunisia","stage":"group stage"},
    {"id":28,"date":"2018-06-23T18:00:00.000Z","home":"Germany","away":"Sweden","stage":"group stage"},
    {"id":29,"date":"2018-06-23T15:00:00.000Z","home":"Korea Republic","away":"Mexico","stage":"group stage"},

    {"id":30,"date":"2018-06-24T12:00:00.000Z","home":"England","away":"Panama","stage":"group stage"},
    {"id":31,"date":"2018-06-24T15:00:00.000Z","home":"Japan","away":"Senegal","stage":"group stage"},
    {"id":32,"date":"2018-06-24T18:00:00.000Z","home":"Poland","away":"Colombia","stage":"group stage"},

    {"id":33,"date":"2018-06-25T14:00:00.000Z","home":"Uruguay","away":"Russia","stage":"group stage"},
    {"id":34,"date":"2018-06-25T14:00:00.000Z","home":"Saudi Arabia","away":"Egypt","stage":"group stage"},
    {"id":35,"date":"2018-06-25T18:00:00.000Z","home":"Iran","away":"Portugal","stage":"group stage"},
    {"id":36,"date":"2018-06-25T18:00:00.000Z","home":"Spain","away":"Morocco","stage":"group stage"},

    {"id":37,"date":"2018-06-26T14:00:00.000Z","home":"Denmark","away":"France","stage":"group stage"},
    {"id":38,"date":"2018-06-26T14:00:00.000Z","home":"Australia","away":"Peru","stage":"group stage"},
    {"id":39,"date":"2018-06-26T18:00:00.000Z","home":"Nigeria","away":"Argentina","stage":"group stage"},
    {"id":40,"date":"2018-06-26T18:00:00.000Z","home":"Iceland","away":"Croatia","stage":"group stage"},

    {"id":41,"date":"2018-06-27T14:00:00.000Z","home":"Korea Republic","away":"Germany","stage":"group stage"},
    {"id":42,"date":"2018-06-27T14:00:00.000Z","home":"Mexico","away":"Sweden","stage":"group stage"},
    {"id":43,"date":"2018-06-27T18:00:00.000Z","home":"Serbia","away":"Brazil","stage":"group stage"},
    {"id":44,"date":"2018-06-27T18:00:00.000Z","home":"Switzerland","away":"Costa Rica","stage":"group stage"},

    {"id":45,"date":"2018-06-28T14:00:00.000Z","home":"Japan","away":"Poland","stage":"group stage"},
    {"id":46,"date":"2018-06-28T14:00:00.000Z","home":"Senegal","away":"Colombia","stage":"group stage"},
    {"id":47,"date":"2018-06-28T18:00:00.000Z","home":"England","away":"Belgium","stage":"group stage"},
    {"id":48,"date":"2018-06-28T18:00:00.000Z","home":"Panama","away":"Tunisia","stage":"group stage"},

    {"id":49,"date":"2018-06-30T14:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},
    {"id":50,"date":"2018-06-30T18:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},

    {"id":51,"date":"2018-07-01T14:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},
    {"id":52,"date":"2018-07-01T18:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},

    {"id":53,"date":"2018-07-02T14:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},
    {"id":54,"date":"2018-07-02T18:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},

    {"id":55,"date":"2018-07-03T14:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},
    {"id":56,"date":"2018-07-03T18:00:00.000Z","home":"TBD","away":"TBD","stage":"round of 16"},

    {"id":57,"date":"2018-07-06T14:00:00.000Z","home":"TBD","away":"TBD","stage":"quarter finals"},
    {"id":58,"date":"2018-07-06T18:00:00.000Z","home":"TBD","away":"TBD","stage":"quarter finals"},

    {"id":59,"date":"2018-07-07T14:00:00.000Z","home":"TBD","away":"TBD","stage":"quarter finals"},
    {"id":60,"date":"2018-07-07T18:00:00.000Z","home":"TBD","away":"TBD","stage":"quarter finals"},

    {"id":61,"date":"2018-07-10T18:00:00.000Z","home":"TBD","away":"TBD","stage":"semi finals"},

    {"id":62,"date":"2018-07-11T18:00:00.000Z","home":"TBD","away":"TBD","stage":"semi finals"},

    {"id":63,"date":"2018-07-14T14:00:00.000Z","home":"TBD","away":"TBD","stage":"third place"},

    {"id":64,"date":"2018-07-15T15:00:00.000Z","home":"TBD","away":"TBD","stage":"final"}]);

  done();
};

module.exports.down = function (done) {
  this.db.collection('match').deleteMany({});

  done();
};
