/* eslint no-console: 0 */

const fs = require('fs').promises;
const { findDayWithSmallestRange } = require('./weather');

fs.readFile(process.argv[2], 'utf8')
  .then(findDayWithSmallestRange)
  .then(console.log)
  .catch((error) => {
    console.error(error.message);
  });
