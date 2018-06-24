'use strict';

module.exports.id = "show-group-with-matches";

module.exports.up = function (done) {
  this.db.collection('match').deleteMany({}).then(() => {
    this.db.collection('match').insertMany([
    {"id": 1,"date":"2018-06-14T15:00:00.000Z","home":"Russia","away":"Saudi Arabia","stage":"Group A"},

    {"id": 2,"date":"2018-06-15T12:00:00.000Z","home":"Egypt","away":"Uruguay","stage":"Group A"},
    {"id": 3,"date":"2018-06-15T15:00:00.000Z","home":"Morocco","away":"Iran","stage":"Group B"},
    {"id": 4,"date":"2018-06-15T18:00:00.000Z","home":"Portugal","away":"Spain","stage":"Group B"},

    {"id": 5,"date":"2018-06-16T10:00:00.000Z","home":"France","away":"Australia","stage":"Group C"},
    {"id": 6,"date":"2018-06-16T13:00:00.000Z","home":"Argentina","away":"Iceland","stage":"Group D"},
    {"id": 7,"date":"2018-06-16T16:00:00.000Z","home":"Peru","away":"Denmark","stage":"Group C"},
    {"id": 8,"date":"2018-06-16T19:00:00.000Z","home":"Croatia","away":"Nigeria","stage":"Group D"},

    {"id": 9,"date":"2018-06-17T12:00:00.000Z","home":"Costa Rica","away":"Serbia","stage":"Group E"},
    {"id":10,"date":"2018-06-17T15:00:00.000Z","home":"Germany","away":"Mexico","stage":"Group F"},
    {"id":11,"date":"2018-06-17T18:00:00.000Z","home":"Brazil","away":"Switzerland","stage":"Group E"},

    {"id":12,"date":"2018-06-18T12:00:00.000Z","home":"Sweden","away":"Korea Republic","stage":"Group F"},
    {"id":13,"date":"2018-06-18T15:00:00.000Z","home":"Belgium","away":"Panama","stage":"Group G"},
    {"id":14,"date":"2018-06-18T18:00:00.000Z","home":"Tunisia","away":"England","stage":"Group G"},

    {"id":15,"date":"2018-06-19T12:00:00.000Z","home":"Colombia","away":"Japan","stage":"Group H"},
    {"id":16,"date":"2018-06-19T15:00:00.000Z","home":"Poland","away":"Senegal","stage":"Group H"},
    {"id":17,"date":"2018-06-19T18:00:00.000Z","home":"Russia","away":"Egypt","stage":"Group A"},

    {"id":18,"date":"2018-06-20T12:00:00.000Z","home":"Portugal","away":"Morocco","stage":"Group B"},
    {"id":19,"date":"2018-06-20T15:00:00.000Z","home":"Uruguay","away":"Saudi Arabia","stage":"Group A"},
    {"id":20,"date":"2018-06-20T18:00:00.000Z","home":"Iran","away":"Spain","stage":"Group B"},

    {"id":21,"date":"2018-06-21T12:00:00.000Z","home":"Denmark","away":"Australia","stage":"Group C"},
    {"id":22,"date":"2018-06-21T15:00:00.000Z","home":"France","away":"Peru","stage":"Group C"},
    {"id":23,"date":"2018-06-21T18:00:00.000Z","home":"Argentina","away":"Croatia","stage":"Group D"},

    {"id":24,"date":"2018-06-22T12:00:00.000Z","home":"Brazil","away":"Costa Rica","stage":"Group E"},
    {"id":25,"date":"2018-06-22T15:00:00.000Z","home":"Nigeria","away":"Iceland","stage":"Group D"},
    {"id":26,"date":"2018-06-22T18:00:00.000Z","home":"Serbia","away":"Switzerland","stage":"Group E"},

    {"id":27,"date":"2018-06-23T12:00:00.000Z","home":"Belgium","away":"Tunisia","stage":"Group G"},
    {"id":28,"date":"2018-06-23T18:00:00.000Z","home":"Germany","away":"Sweden","stage":"Group F"},
    {"id":29,"date":"2018-06-23T15:00:00.000Z","home":"Korea Republic","away":"Mexico","stage":"Group G"},

    {"id":30,"date":"2018-06-24T12:00:00.000Z","home":"England","away":"Panama","stage":"Group G"},
    {"id":31,"date":"2018-06-24T15:00:00.000Z","home":"Japan","away":"Senegal","stage":"Group H"},
    {"id":32,"date":"2018-06-24T18:00:00.000Z","home":"Poland","away":"Colombia","stage":"Group H"},

    {"id":33,"date":"2018-06-25T14:00:00.000Z","home":"Uruguay","away":"Russia","stage":"Group A"},
    {"id":34,"date":"2018-06-25T14:00:00.000Z","home":"Saudi Arabia","away":"Egypt","stage":"Group A"},
    {"id":35,"date":"2018-06-25T18:00:00.000Z","home":"Iran","away":"Portugal","stage":"Group B"},
    {"id":36,"date":"2018-06-25T18:00:00.000Z","home":"Spain","away":"Morocco","stage":"Group B"},

    {"id":37,"date":"2018-06-26T14:00:00.000Z","home":"Denmark","away":"France","stage":"Group C"},
    {"id":38,"date":"2018-06-26T14:00:00.000Z","home":"Australia","away":"Peru","stage":"Group C"},
    {"id":39,"date":"2018-06-26T18:00:00.000Z","home":"Nigeria","away":"Argentina","stage":"Group D"},
    {"id":40,"date":"2018-06-26T18:00:00.000Z","home":"Iceland","away":"Croatia","stage":"Group D"},

    {"id":41,"date":"2018-06-27T14:00:00.000Z","home":"Korea Republic","away":"Germany","stage":"Group F"},
    {"id":42,"date":"2018-06-27T14:00:00.000Z","home":"Mexico","away":"Sweden","stage":"Group F"},
    {"id":43,"date":"2018-06-27T18:00:00.000Z","home":"Serbia","away":"Brazil","stage":"Group E"},
    {"id":44,"date":"2018-06-27T18:00:00.000Z","home":"Switzerland","away":"Costa Rica","stage":"Group E"},

    {"id":45,"date":"2018-06-28T14:00:00.000Z","home":"Japan","away":"Poland","stage":"Group H"},
    {"id":46,"date":"2018-06-28T14:00:00.000Z","home":"Senegal","away":"Colombia","stage":"Group H"},
    {"id":47,"date":"2018-06-28T18:00:00.000Z","home":"England","away":"Belgium","stage":"Group G"},
    {"id":48,"date":"2018-06-28T18:00:00.000Z","home":"Panama","away":"Tunisia","stage":"Group G"},

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

    {"id":64,"date":"2018-07-15T15:00:00.000Z","home":"TBD","away":"TBD","stage":"final"}]).then(() => done());
  });
};

module.exports.down = function (done) {
  done();
};
