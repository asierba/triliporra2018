import * as React from 'react';
import * as expect from 'expect.js';
import {mount} from 'enzyme';
import * as moxios from 'moxios'
import * as Auth from '../../../../src/web/Auth';
import * as ReactRouter from 'react-router';
import ProfilePage from "../../../../src/web/components/user/profilePage";

const authForLoggedInUser = (userId) => function () {
  return {
    isAuthenticated: () => true,
    getUserId: () => Promise.resolve(userId)
  }
}

function authForNoLoggedInUser() {
  return {
    isAuthenticated: () => false,
    getUserId: () => Promise.reject('no access token')
  }
}

describe('profilePage', () => {
  beforeEach(() => {
    moxios.install();
  });


  afterEach(() => {
    moxios.uninstall();
  });

  describe('When User is not logged in', () => {
    let redirectTo;

    beforeEach((done) => {
      // @ts-ignore
      Auth.default = authForNoLoggedInUser;
      // @ts-ignore
      ReactRouter.Redirect = (props) => {
        redirectTo = props.to;
        return <div></div>;
      };

      mount(<ProfilePage />);

      setImmediate(done);
    });

    it('should redirect to root', () => {
      expect(redirectTo).to.be('/');
    });
  });

  describe('When User is logged in', () => {
    let profilePage;
    const userId = 678;

    beforeEach((done) => {
      // @ts-ignore
      Auth.default = authForLoggedInUser(userId);

      const matches = [
        {
          id: 1,
          home: 'Brazil',
          away: 'Russia',
          stage: 'group A',
          score: {
            home: 1,
            away: 0
          },
          prediction: 'home',
          result: 'guessed',
        },
        {
          id: 2,
          home: 'France',
          away: 'Italy',
          stage: 'group B',
          prediction: 'away',
          score: {
            home: 3,
            away: 2
          },
          result: 'missed',
        },
        {
          id: 3,
          home: 'A',
          away: 'B',
          stage: 'group X',
          prediction: 'away',
          score: {
            home: 6,
            away: 6
          },
          result: 'missed',
        },
        {
          id: 4,
          home: 'C',
          away: 'D',
          stage: 'group X',
          score: {
            home: 3,
            away: 2
          },
        },
        {
          id: 5,
          home: 'E',
          away: 'F',
          stage: 'group Y',
          prediction: 'draw'
        }
      ];

      const predictionResults = {
        guessed: 1,
        missed: 2
      };
      moxios.stubRequest(`/api/user/${userId}`, {
        responseText: JSON.stringify({
          properties: {
            matches,
            "prediction-results": predictionResults,
          },
        })
      });

      profilePage = mount(<ProfilePage />);

      setImmediate(() => {
        profilePage.update();
        done();
      });
    });

    it('should display list of all matches', () => {
      expect(profilePage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
      expect(profilePage.find('[data-id="away"]').at(0).text()).to.be('Russia');
      expect(profilePage.find('[data-id="stage"]').at(0).text()).to.be('group A');

      expect(profilePage.find('[data-id="home"]').at(1).text()).to.be('France');
      expect(profilePage.find('[data-id="away"]').at(1).text()).to.be('Italy');
      expect(profilePage.find('[data-id="stage"]').at(1).text()).to.be('group B');
    });

    it('should display predictions', () => {
      expect(profilePage.find('[data-id="prediction"]').at(0).props().value).to.be('home');
      expect(profilePage.find('[data-id="prediction"]').at(1).props().value).to.be('away');
    });

    [
      {elementIndex: 0, id: 1, prediction: 'draw' },
      {elementIndex: 1, id: 2, prediction: 'home' },
    ].forEach(data => {
      const {elementIndex, id, prediction } = data;
      it('should let update predictions', (done) => {
        profilePage.find('[data-id="prediction"]').at(elementIndex).simulate('change', { target: { value: prediction } });

        setImmediate(() => {
          const request = moxios.requests.mostRecent();
          expect(request.url).to.eql(`/api/user/${userId}/match/${id}`);
          expect(request.config.data).to.eql(JSON.stringify({prediction: prediction}));
          done();
        });
      });
    });

    it('should show guessed or missed status of prediction', () => {
      const guessed = 'guessed-prediction';
      const missed = 'missed-prediction';
      const noResult = undefined;
      expect(profilePage.find('[data-id="prediction-result"]').at(0).props().className).to.contain(guessed);
      expect(profilePage.find('[data-id="prediction-result"]').at(1).props().className).to.contain(missed);
      expect(profilePage.find('[data-id="prediction-result"]').at(2).props().className).to.contain(missed);
      expect(profilePage.find('[data-id="prediction-result"]').at(3).props().className).to.be(noResult);
      expect(profilePage.find('[data-id="prediction-result"]').at(4).props().className).to.be(noResult);
    });


    it('should show total of guessed and missed predictions', () => {
      expect(profilePage.find('[data-id="num-guessed"]').text()).to.eql(1);
      expect(profilePage.find('[data-id="num-missed"]').text()).to.eql(2);
    });

    it.skip('should not allow updating predictions of matches in the past', () => {
      // TODO
    });
  });
});
