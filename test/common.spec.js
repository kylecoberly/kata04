/* global jest, describe, it, expect */

const {
  exists, parseData, getRangeSize, getSmallest, toNumber,
} = require('../lib/common');
const { weather1, weather2, weather3 } = require('../fixtures/weather');

describe('exists', () => {
  it('returns true if given an empty object', () => {
    expect(exists({})).toBe(true);
  });
  it('returns true if given the string `a`', () => {
    expect(exists('a')).toBe(true);
  });
  it('returns true if given an empty array', () => {
    expect(exists([])).toBe(true);
  });
  it('returns false if given null', () => {
    expect(exists(null)).toBe(false);
  });
  it('returns false if given undefined', () => {
    expect(exists(undefined)).toBe(false);
  });
  it('returns false if given an empty string', () => {
    expect(exists('')).toBe(false);
  });
});

describe('parseData', () => {
  it('transforms empty TSV data into an empty array', () => {
    expect(parseData(weather1, 3, () => {})).toEqual([]);
  });
  it('transforms TSV data with one day into an array with that day', () => {
    const expected = [{
      Dy: 1,
      MxT: 88,
      Mnt: 59,
    }];
    const mappingFunction = jest.fn();
    mappingFunction.mockReturnValueOnce(expected[0]);
    expect(parseData(weather2, 3, mappingFunction)).toEqual(expected);
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
    const mappingFunction = jest.fn();
    mappingFunction
      .mockReturnValueOnce(expected[0])
      .mockReturnValueOnce(expected[1])
      .mockReturnValueOnce(expected[2]);
    expect(parseData(weather3, 3, mappingFunction)).toEqual(expected);
  });
  it('returns an empty array if given no teams', () => {
    const mappingFunction = jest.fn();
    expect(parseData('', 2, mappingFunction)).toEqual([]);
  });

  it('ignores lines with ---', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
   -------------------------------------------------------
    3. Manchester_U    38    24   5   9    87  -  45    77
    `;
    const expected = [{
      teamName: 'Arsenal',
      pointsFor: 79,
      pointsAgainst: 36,
    }, {
      teamName: 'Manchester_U',
      pointsFor: 87,
      pointsAgainst: 45,
    }];
    const mappingFunction = jest.fn();
    mappingFunction
      .mockReturnValueOnce(expected[0])
      .mockReturnValueOnce(expected[1]);
    expect(parseData(fixture, 2, mappingFunction)).toEqual(expected);
  });

  it('returns an array with the Arsenal object if given a TSV with the Arsenal team', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    `;
    const expected = [{
      teamName: 'Arsenal',
      pointsFor: 79,
      pointsAgainst: 36,
    }];
    const mappingFunction = jest.fn();
    mappingFunction
      .mockReturnValueOnce(expected[0]);
    expect(parseData(fixture, 2, mappingFunction)).toEqual(expected);
  });

  it('returns an array with the Liverpool object if given a TSV with the Liverpool team', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    2. Liverpool       38    24   8   6    67  -  30    80
    `;
    const expected = [{
      teamName: 'Liverpool',
      pointsFor: 67,
      pointsAgainst: 30,
    }];
    const mappingFunction = jest.fn();
    mappingFunction
      .mockReturnValueOnce(expected[0]);
    expect(parseData(fixture, 2, mappingFunction)).toEqual(expected);
  });

  it('returns an array with multiple objects if given a TSV with multiple teams', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    2. Liverpool       38    24   8   6    67  -  30    80
    3. Manchester_U    38    24   5   9    87  -  45    77
    `;
    const expected = [{
      teamName: 'Arsenal',
      pointsFor: 79,
      pointsAgainst: 36,
    }, {
      teamName: 'Liverpool',
      pointsFor: 67,
      pointsAgainst: 30,
    }, {
      teamName: 'Manchester_U',
      pointsFor: 87,
      pointsAgainst: 45,
    }];
    const mappingFunction = jest.fn();
    mappingFunction
      .mockReturnValueOnce(expected[0])
      .mockReturnValueOnce(expected[1])
      .mockReturnValueOnce(expected[2]);
    expect(parseData(fixture, 2, mappingFunction)).toEqual(expected);
  });
});

describe('getRangeSize', () => {
  it('returns 0 when the max and min are the same', () => {
    const day = {
      MxT: 88,
      Mnt: 88,
    };
    expect(getRangeSize(['Mnt', 'MxT'], day)).toEqual(0);
  });
  it('returns 1 when the max is one more than the min', () => {
    const day = {
      MxT: 89,
      Mnt: 88,
    };
    expect(getRangeSize(['Mnt', 'MxT'], day)).toEqual(1);
  });
  it('returns 0 if the for and against are both 1', () => {
    const team = {
      pointsFor: 1,
      pointsAgainst: 1,
    };
    expect(getRangeSize(['pointsFor', 'pointsAgainst'], team)).toBe(0);
  });
  it('returns 2 if the for is 3 and against is 1', () => {
    const team = {
      pointsFor: 3,
      pointsAgainst: 1,
    };
    expect(getRangeSize(['pointsFor', 'pointsAgainst'], team)).toBe(2);
  });
  it('returns 2 if the for is 1 and against is 3', () => {
    const team = {
      pointsFor: 1,
      pointsAgainst: 3,
    };
    expect(getRangeSize(['pointsFor', 'pointsAgainst'], team)).toBe(2);
  });
});

describe('getSmallest', () => {
  it('returns x when given x and y', () => {
    const x = {
      a: 1,
      b: 2,
    };
    const y = {
      a: 3,
      b: 6,
    };
    const result = getSmallest(['a', 'b'])(x, y);
    expect(result).toEqual(x);
  });
  it('returns x when given y and x', () => {
    const x = {
      a: 1,
      b: 2,
    };
    const y = {
      a: 3,
      b: 6,
    };
    const result = getSmallest(['b', 'a'])(y, x);
    expect(result).toEqual(x);
  });
});

describe('toNumber', () => {
  it('returns 1 when given 1', () => {
    expect(toNumber('1')).toBe(1);
  });
  it('returns 1 when given 1*', () => {
    expect(toNumber('1*')).toBe(1);
  });
  it('returns 19 when given 19*', () => {
    expect(toNumber('19*')).toBe(19);
  });
});
