import React from 'react';
import MatchesPage from "../../../../src/web/components/match/matchesPage";

import expect from 'expect.js';
import {shallow, mount} from 'enzyme';

import moxios from 'moxios'

describe("MatchesPage", () => {
  beforeEach(() => {
    moxios.install();
  });

  it('should display list of all matches', (done) => {

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

    const matchesPage = mount(<MatchesPage />);

    setImmediate(() => {
      matchesPage.update();

      expect(matchesPage.find('[data-id="home"]').length).to.be(2);

      expect(matchesPage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
      expect(matchesPage.find('[data-id="away"]').at(0).text()).to.be('Russia');
      expect(matchesPage.find('[data-id="stage"]').at(0).text()).to.be('group A');

      expect(matchesPage.find('[data-id="home"]').at(1).text()).to.be('France');
      expect(matchesPage.find('[data-id="away"]').at(1).text()).to.be('Italy');
      expect(matchesPage.find('[data-id="stage"]').at(1).text()).to.be('group B');

      moxios.uninstall();
      done();
    });
  });

});
