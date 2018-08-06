import * as React from 'react';
import MatchesPage from "../../../../src/web/components/match/matchesPage";

import * as expect from 'expect.js';
import {mount} from 'enzyme';
import * as moxios from 'moxios'

describe("MatchesPage", () => {
  let matchesPage;

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  beforeEach((done) => {
    const matches = [
      {
        id: 1,
        home: 'Brazil',
        away: 'Russia',
        stage: 'group A'
      },
      {
        id: 2,
        home: 'France',
        away: 'Italy',
        stage: 'group B'
      }];

    moxios.stubRequest('/api/match', {
      responseText: JSON.stringify({entities: matches})
    })

    matchesPage = mount(<MatchesPage />);

    setImmediate(() => {
      matchesPage.update();
      done();
    });
  });


  it('should display list of all matches', () => {
    expect(matchesPage.find('[data-id="home"]').length).to.be(2);

    expect(matchesPage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
    expect(matchesPage.find('[data-id="away"]').at(0).text()).to.be('Russia');
    expect(matchesPage.find('[data-id="stage"]').at(0).text()).to.be('group A');

    expect(matchesPage.find('[data-id="home"]').at(1).text()).to.be('France');
    expect(matchesPage.find('[data-id="away"]').at(1).text()).to.be('Italy');
    expect(matchesPage.find('[data-id="stage"]').at(1).text()).to.be('group B');
  });

  it('should NOT display predictions', () => {
    expect(matchesPage.find('[data-id="prediction"]').exists()).to.be(false);
  });
});
