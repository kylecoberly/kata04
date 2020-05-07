/* global describe, it, expect */
const runScript = require('../run-script');

const { findTeamWithClosestRange, getSpread } = require('../football');

describe('Running football-runner.js', () => {
  it('returns Aston Villa when given the sample data', (done) => {
    runScript('node', ['football-runner.js', 'data/football.dat'], (output) => {
      expect(output).toMatch('Aston_Villa');
      done();
    });
  });
});

describe('findTeamWithClosestRange', () => {
  it('returns an empty string with no team', () => {
    expect(findTeamWithClosestRange('')).toEqual('');
  });
  it('returns `Arsenal` if Arsenal is the only team given', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    `;
    expect(findTeamWithClosestRange(fixture)).toEqual('Arsenal');
  });
  it('returns `Liverpool` if Liverpool is the only team given', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    2. Liverpool       38    24   8   6    67  -  30    80
    `;
    expect(findTeamWithClosestRange(fixture)).toEqual('Liverpool');
  });
  it('returns `Liverpool` if Liverpool and Arsenal are given', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    2. Liverpool       38    24   8   6    67  -  30    80
    `;
    expect(findTeamWithClosestRange(fixture)).toEqual('Liverpool');
  });
  it('returns `Liverpool` if Liverpool, Arsenal, and Manchester are given', () => {
    const fixture = `
       Team            P     W    L   D    F      A     Pts
    1. Arsenal         38    26   9   3    79  -  36    87
    2. Liverpool       38    24   8   6    67  -  30    80
    3. Manchester_U    38    24   5   9    87  -  45    77
    `;
    expect(findTeamWithClosestRange(fixture)).toEqual('Liverpool');
  });
});
