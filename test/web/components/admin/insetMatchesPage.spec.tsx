import * as React from 'react';
import * as expect from 'expect.js';
import {mount} from 'enzyme';
import * as moxios from 'moxios'
import * as Auth from '../../../../src/web/Auth';
import InsertMatchesPage from "../../../../src/web/components/admin/insertMatchesPage"
import * as ReactRouter from 'react-router';

function authForAdminUser() {
  return {
    isAdmin: () => Promise.resolve(true)
  }
}

function authForNoAdminUser() {
  return {
    isAdmin: () => Promise.resolve(false)
  }
}

describe('InsertMatchesPage', () => {
  beforeEach(() => {
    moxios.install();
  });


  afterEach(() => {
    moxios.uninstall();
  });

  describe('When User is Admin', () => {
    let matchesPage;

    beforeEach((done) => {
      // @ts-ignore
      Auth.default = authForAdminUser;

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
        },
        {
          id: 3,
          home: 'Spain',
          away: 'Belgium',
          score : { home: 2, away: 2, penalties: { home: 3, away: 4}}
        },];

      moxios.stubRequest('/api/match', {
        responseText: JSON.stringify({entities: matches})
      });

      matchesPage = mount(<InsertMatchesPage />);

      setImmediate(() => {
        matchesPage.update();
        done();
      });
    });

    it('should display list of all matches with scores with penalties', () => {
      expect(matchesPage.find('[data-id="home"]').length).to.be(3);
      expect(matchesPage.find('[data-id="away"]').length).to.be(3);

      expect(matchesPage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
      expect(matchesPage.find('[data-id="away"]').at(0).text()).to.be('Russia');
      expect(matchesPage.find('[data-id="score-home"]').at(0).props().value).to.be(4);
      expect(matchesPage.find('[data-id="score-away"]').at(0).props().value).to.be(6);
      expect(matchesPage.find('[data-id="has-penalties"]').at(0).props().value).to.be('false');


      expect(matchesPage.find('[data-id="home"]').at(1).text()).to.be('France');
      expect(matchesPage.find('[data-id="away"]').at(1).text()).to.be('Italy');
      expect(matchesPage.find('[data-id="score-home"]').at(1).props().value).to.be(undefined);
      expect(matchesPage.find('[data-id="score-away"]').at(1).props().value).to.be(undefined);
      expect(matchesPage.find('[data-id="has-penalties"]').at(1).props().value).to.be('false');

      expect(matchesPage.find('[data-id="home"]').at(2).text()).to.be('Spain');
      expect(matchesPage.find('[data-id="away"]').at(2).text()).to.be('Belgium');
      expect(matchesPage.find('[data-id="score-home"]').at(2).props().value).to.be(2);
      expect(matchesPage.find('[data-id="score-away"]').at(2).props().value).to.be(2);

      expect(matchesPage.find('[data-id="has-penalties"]').at(2).props().value).to.be('true');
      expect(matchesPage.find('[data-id="has-penalties"]').at(2).props().checked).to.be(true);
      expect(matchesPage.find('[data-id="penalties-home"]').at(2).props().value).to.be(3);
      expect(matchesPage.find('[data-id="penalties-away"]').at(2).props().value).to.be(4);

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
    });

    it('should let user to add a match score with penalties', (done) => {
      matchesPage.find('[data-id="score-home"]').at(1).simulate('change', { target: { value: 2 } });
      matchesPage.find('[data-id="score-away"]').at(1).simulate('change', { target: { value: 2 } });

      matchesPage.find('[data-id="has-penalties"]').at(1).simulate('change', { target: { checked: true } });
      matchesPage.find('[data-id="penalties-home"]').at(1).simulate('change', { target: { value: 5 } });
      matchesPage.find('[data-id="penalties-away"]').at(1).simulate('change', { target: { value: 4 } });

      matchesPage.find('[data-id="save-match"]').at(1).simulate("click");

      setImmediate(() => {
        const request = moxios.requests.mostRecent();
        expect(request.url).to.eql('/api/match/2');
        expect(request.config.data).to.eql(JSON.stringify({
          score: {
            home: 2,
            away: 2,
            penalties: {
              home: 5,
              away: 4
            }
          }
        }));
        done();
      });
    });
  });

  describe('When User is no Admin', () => {
    let redirectTo;

    beforeEach((done) => {
      // @ts-ignore
      Auth.default = authForNoAdminUser;
      // @ts-ignore
      ReactRouter.Redirect = (props) => {
        redirectTo = props.to;
        return <div></div>;
      };
      mount(<InsertMatchesPage />);

      setImmediate(done);
    });

    it('should redirect to root', () => {
      expect(redirectTo).to.be('/');
    });
  });
});
