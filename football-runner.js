/* eslint no-console: 0 */

const { readFile } = require('fs').promises;
const { findTeamWithClosestRange } = require('./football');

readFile(process.argv[2], 'utf8')
  .then((file) => {
    const result = findTeamWithClosestRange(file);
    console.log(result);
  }).catch((error) => console.error(error.message));
