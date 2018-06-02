import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';
import moxios from 'moxios'
import InsertMatchesPage from "../../../../src/web/components/admin/insertMatchesPage";

describe('InsertMatchesPage', () => {
  let matchesPage;

  beforeEach((done) => {
    moxios.install();

    const matches = [
      {
        id: 1,
        home: 'Brazil',
        away: 'Russia',
        score : { home: 4, away: 6}
      },
      {
        id: 2,
        home: 'France',
        away: 'Italy'
      }];

    moxios.stubRequest('/api/match', {
      responseText: JSON.stringify({entities: matches})
    })

    matchesPage = mount(<InsertMatchesPage />);

    setImmediate(() => {
      matchesPage.update();
      done();
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should display list of all matches with scores', () => {
    expect(matchesPage.find('[data-id="home"]').length).to.be(2);
    expect(matchesPage.find('[data-id="away"]').length).to.be(2);

    expect(matchesPage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
    expect(matchesPage.find('[data-id="away"]').at(0).text()).to.be('Russia');
    expect(matchesPage.find('[data-id="score-home"]').at(0).props().value).to.be(4);
    expect(matchesPage.find('[data-id="score-away"]').at(0).props().value).to.be(6);

    expect(matchesPage.find('[data-id="home"]').at(1).text()).to.be('France');
    expect(matchesPage.find('[data-id="away"]').at(1).text()).to.be('Italy');
    expect(matchesPage.find('[data-id="score-home"]').at(1).props().value).to.be(undefined);
    expect(matchesPage.find('[data-id="score-away"]').at(1).props().value).to.be(undefined);

  });

  it('should let user to add a match score', (done) => {
    matchesPage.find('[data-id="score-home"]').at(1).simulate('change', { target: { value: 3 } });
    matchesPage.find('[data-id="score-away"]').at(1).simulate('change', { target: { value: 2 } });

    matchesPage.find('[data-id="save-match"]').at(1).simulate("click");

    setImmediate(() => {
      const request = moxios.requests.mostRecent();
      expect(request.url).to.eql('/api/match/2');
      expect(request.config.data).to.eql(JSON.stringify({score: { home: 3, away: 2}}));
      done();
    });
  })
});
