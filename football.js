const {
  exists, parseData, getSmallest, toNumber,
} = require('./lib/common');

function teamTextToObject(team) {
  const stats = team.split(/\s/).filter(exists);
  if (/---/.test(stats[0])) return null;

  return {
    teamName: stats[1],
    pointsFor: toNumber(stats[6]),
    pointsAgainst: toNumber(stats[8]),
  };
}

function findTeamWithClosestRange(data) {
  if (!data) return '';

  const teams = parseData(data, 2, teamTextToObject);

  return teams.reduce(getSmallest(['pointsFor', 'pointsAgainst'])).teamName;
}

module.exports = {
  findTeamWithClosestRange,
};
