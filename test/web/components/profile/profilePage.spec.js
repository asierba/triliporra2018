import React from 'react';
import expect from 'expect.js';
import {mount} from 'enzyme';
import moxios from 'moxios'
import proxyquire from 'proxyquire';

proxyquire.noCallThru();

function authForLoggedInUser() {
  return {
    isAuthenticated: () => true
  }
}

function authForNoLoggedInUser() {
  return {
    isAuthenticated: () => false
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
    let matchesPage;

    beforeEach((done) => {
      const ProfilePage = proxyquire("../../../../src/web/components/profile/profilePage", {
        '../../Auth': authForLoggedInUser
      }).default;

      matchesPage = mount(<ProfilePage />);

      setImmediate(() => {
        matchesPage.update();
        done();
      });
    });

    it('should show the profile page', () => {
      expect(matchesPage.find('[data-id="profile-page"]').length).to.be(1);
    });
  });
});
