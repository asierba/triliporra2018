import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';
import moxios from 'moxios'
import proxyquire from 'proxyquire';
const profilePagePath = "../../../../src/web/components/profile/profilePage";

proxyquire.noCallThru();

const authForLoggedInUser = (userId) => () => {
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
      const ProfilePage = proxyquire(profilePagePath, {
        '../../Auth': authForNoLoggedInUser,
        'react-router':  {
          Redirect: (props) => {
            redirectTo = props.to;
            return <div></div>;
          }
        }
      }).default;

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
      const ProfilePage = proxyquire(profilePagePath, {
        '../../Auth': authForLoggedInUser(userId)
      }).default;

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
          prediction: 'home'
        },
        {
          id: 2,
          home: 'France',
          away: 'Italy',
          stage: 'group B',
          prediction: 'away'
        }];

      moxios.stubRequest(`/api/user/${userId}`, {
        responseText: JSON.stringify({
          properties: {
            matches
          }
        })
      });

      profilePage = mount(<ProfilePage />);

      setImmediate(() => {
        profilePage.update();
        done();
      });
    });

    it('should display list of all matches', () => {

      expect(profilePage.find('[data-id="home"]').length).to.be(2);

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

    it('should let update predictions', (done) => {
      profilePage.find('[data-id="prediction"]').at(0).simulate('change', { target: { value: 'draw' } });

      setImmediate(() => {
        const request = moxios.requests.mostRecent();
        expect(request.url).to.eql(`/api/user/${userId}/match/1`);
        expect(request.config.data).to.eql(JSON.stringify({prediction: "draw"}));
        done();
      });
    });

    it('should let update predictions 2', (done) => {
      profilePage.find('[data-id="prediction"]').at(1).simulate('change', { target: { value: 'home' } });

      setImmediate(() => {
        const request = moxios.requests.mostRecent();
        expect(request.url).to.eql(`/api/user/${userId}/match/2`);
        expect(request.config.data).to.eql(JSON.stringify({prediction: "home"}));
        done();
      });
    });
  });
});
