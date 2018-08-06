import * as React from 'react';
import * as expect from 'expect.js';
import {mount} from 'enzyme';
import * as moxios from 'moxios'
import UserPage from "../../../../src/web/components/user/userPage";

describe('userPage', () => {
  let userPage;

  beforeEach(() => {
    moxios.install();
  });


  afterEach(() => {
    moxios.uninstall();
  });

  beforeEach((done) => {
    const userId = 123;

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
        prediction: 'away',
        score: {
          home: 3,
          away: 2
        },
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

    moxios.stubRequest(`/api/user/${userId}`, {
      responseText: JSON.stringify({
        properties: {
          matches,
          'prediction-results' : {
            guessed: 1,
            missed: 2
          },
        }
      })
    });

    userPage = mount(<UserPage match={{ params: {id: 123} }} />);


    setImmediate(() => {
      userPage.update();
      done();
    });
  });

  it('should display list of all matches for the user', () => {
    expect(userPage.find('[data-id="home"]').at(0).text()).to.be('Brazil');
    expect(userPage.find('[data-id="away"]').at(0).text()).to.be('Russia');
    expect(userPage.find('[data-id="stage"]').at(0).text()).to.be('group A');

    expect(userPage.find('[data-id="home"]').at(1).text()).to.be('France');
    expect(userPage.find('[data-id="away"]').at(1).text()).to.be('Italy');
    expect(userPage.find('[data-id="stage"]').at(1).text()).to.be('group B');
  });

  it('should display predictions', () => {
    expect(userPage.find('[data-id="prediction"]').at(0).props().value).to.be('home');
    expect(userPage.find('[data-id="prediction"]').at(1).props().value).to.be('away');
  });

  it('should NOT let update predictions', (done) => {
    const userId = 123;


    const {elementIndex, id, prediction } = {elementIndex: 1, id: 2, prediction: 'home' };
    userPage.find('[data-id="prediction"]').at(elementIndex).simulate('change', { target: { value: prediction } });

    setImmediate(() => {
      const request = moxios.requests.mostRecent();
      expect(request.url).to.not.eql(`/api/user/${userId}/match/${id}`);
      done();
    });
  });
});
