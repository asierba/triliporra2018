import request from "supertest";
import expect from "expect.js";
import createTestServer from "./helpers/createTestServer";

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

  it('should have link to matches and users', () =>
    request(server)
      .get('/api')
      .then(response => {
        const body = response.body;
        expect(body.links).to.eql([
          {'rel': ["matches"], "href": "/api/match"},
          {'rel': ["users"], "href": "/api/user"},
          {'rel': ["groups"], "href": "/api/group"},
        ]);
      }));
});
