const childProcess = require('child_process');

function getVersionNumber() {
  return childProcess
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();
}

module.exports = getVersionNumber;
