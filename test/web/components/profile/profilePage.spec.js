import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';
import moxios from 'moxios'
import proxyquire from 'proxyquire';

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
      const ProfilePage = proxyquire("../../../../src/web/components/profile/profilePage", {
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

    beforeEach((done) => {
      const ProfilePage = proxyquire("../../../../src/web/components/profile/profilePage", {
        '../../Auth': authForLoggedInUser(678)
      }).default;

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

      moxios.stubRequest('/api/user/678', {
        responseText: JSON.stringify({
          properties: {
            matches
          }
        })
      });

      profilePage = mount(<ProfilePage />);

      setImmediate(done);
    });

    it('should display list of all matches', () => {
      profilePage.update();

      expect(profilePage.find('[data-id="home"]').length).to.be(2);

      expect(profilePage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
      expect(profilePage.find('[data-id="away"]').at(0).text()).to.be('Russia');
      expect(profilePage.find('[data-id="stage"]').at(0).text()).to.be('group A');

      expect(profilePage.find('[data-id="home"]').at(1).text()).to.be('France');
      expect(profilePage.find('[data-id="away"]').at(1).text()).to.be('Italy');
      expect(profilePage.find('[data-id="stage"]').at(1).text()).to.be('group B');
    });
  });
});
