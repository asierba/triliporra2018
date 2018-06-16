const testPort = 2999;

export default function createTestServer() {
  process.env.PORT = String(testPort);
  return require('../../../src/api/server');
}

