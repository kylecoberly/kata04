const {
  getSmallest, exists, parseData, toNumber,
} = require('./lib/common');

function dayTextToObject(day) {
  const dayData = day.split(/\s/).filter(exists);
  return {
    Dy: toNumber(dayData[0]),
    MxT: toNumber(dayData[1]),
    Mnt: toNumber(dayData[2]),
  };
}

function findDayWithSmallestRange(data) {
  const days = parseData(data, 3, dayTextToObject);

  return days.reduce(getSmallest(['MxT', 'Mnt'])).Dy;
}

module.exports = {
  findDayWithSmallestRange,
};
