import request from "supertest";
import expect from "expect.js";
import createTestServer from "./helpers/createTestServer";
import {Hypermedia} from "./helpers/hypermedia";
import {expectToEndWith} from "./helpers/expectExtensions";

describe('root', () => {
  let server;

  beforeEach(() => {
    server = createTestServer();
  });

  it('should return 200', () =>
    request(server)
      .get('/api')
      .expect(200));

  it('should show the app version', () =>
    request(server)
      .get('/api')
      .then(response => {
        const body = response.body;
        expect(body).to.have.key('version');
      }));

  it('should have link to matches', () =>
    request(server)
      .get('/api')
      .then(response => {
        const body = response.body;
        const href = new Hypermedia(body).getHref('matches');
        expectToEndWith(href, "/api/match");
      }));

  it('should have link to users', () =>
    request(server)
      .get('/api')
      .then(response => {
        const body = response.body;
        const href = new Hypermedia(body).getHref('users');
        expectToEndWith(href, "/api/user");
      }));

  it('should have link to groups', () =>
    request(server)
      .get('/api')
      .then(response => {
        const body = response.body;
        const href = new Hypermedia(body).getHref('groups');
        expectToEndWith(href, "/api/group");
      }));
});
