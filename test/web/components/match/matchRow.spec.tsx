import * as React from 'react';
import MatchRow from "../../../../src/web/components/match/matchRow";

import * as expect from 'expect.js';
import {shallow} from 'enzyme';

describe("MatchRow", () => {
  it('should display "vs" when score not available', () => {
    const match = {
      home: 'Brazil',
      away: 'Russia',
      stage: 'final'
    }
    const matchRow = shallow(<MatchRow match={match}/>);

    expect(matchRow.find('[data-id="score"]').text()).to.be("vs");
  });

  it('should display score when available', () => {
    const match = {
      home: 'Brazil',
      away: 'Russia',
      stage: 'final',
      score: {home: 1, away: 2}
    }
    const matchRow = shallow(<MatchRow match={match}/>);

    expect(matchRow.find('[data-id="score"]').text()).to.be("1-2");
  });

  it('should display penalty score when available', () => {
    const match = {
      home: 'Brazil',
      away: 'Russia',
      stage: 'final',
      score: {
        home: 2,
        away: 2,
        penalties: {
          home: 5,
          away: 4,
        }
      }
    }
    const matchRow = shallow(<MatchRow match={match}/>);

    expect(matchRow.find('[data-id="score"]').text()).to.be("2-2 (5-4)");
  });
});
