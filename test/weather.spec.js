/* global describe, it, expect */

const { findDayWithSmallestRange } = require('../weather');
const runScript = require('../run-script');
const { weather2, weather3 } = require('../fixtures/weather');

describe('index.js', () => {
  it('logs 14 when the program is run with the sample data file path', async (done) => {
    runScript('node', ['index.js', 'data/weather.dat'], (output) => {
      expect(output).toMatch('14');
      done();
    });
  });
});

describe('findDayWithSmallestRange:', () => {
  it('returns 2 when called with sample data 3', () => {
    expect(findDayWithSmallestRange(weather3)).toBe(2);
  });
  it('returns 1 when called with sample data 2', () => {
    expect(findDayWithSmallestRange(weather2)).toBe(1);
  });
});
