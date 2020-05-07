/* global describe, it, expect */

const { parseData, findDayWithSmallestRange, getRangeSize } = require('../weather');
const runScript = require('../run-script');
const { weather1, weather2, weather3 } = require('../fixtures/weather');

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

describe('getRangeSize', () => {
  it('returns 0 when the max and min are the same', () => {
    const day = {
      MxT: 88,
      Mnt: 88,
    };
    expect(getRangeSize(day)).toEqual(0);
  });
  it('returns 1 when the max is one more than the min', () => {
    const day = {
      MxT: 89,
      Mnt: 88,
    };
    expect(getRangeSize(day)).toEqual(1);
  });
});

describe('parseData', () => {
  it('transforms empty TSV data into an empty array', () => {
    expect(parseData(weather1)).toEqual([]);
  });
  it('transforms TSV data with one day into an array with that day', () => {
    const expected = [{
      Dy: 1,
      MxT: 88,
      Mnt: 59,
    }];
    expect(parseData(weather2)).toEqual(expected);
  });
  it('transforms TSV data with three days into an array with those days', () => {
    const expected = [{
      Dy: 1,
      MxT: 88,
      Mnt: 59,
    }, {
      Dy: 2,
      MxT: 79,
      Mnt: 63,
    }, {
      Dy: 3,
      MxT: 77,
      Mnt: 55,
    }];
    expect(parseData(weather3)).toEqual(expected);
  });
});
