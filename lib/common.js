function exists(x) {
  return !!x;
}

function parseData(data, firstLine, mappingFunction) {
  const lines = data.split('\n');
  if (lines.length < firstLine + 1) return [];
  const days = lines.slice(firstLine, -1);

  return days.map(mappingFunction).filter(exists);
}

function getRangeSize([key1, key2], object) {
  return Math.abs(object[key1] - object[key2]);
}

function getSmallest([a, b]) {
  return (x, y) => (getRangeSize([a, b], x) < getRangeSize([a, b], y)
    ? x
    : y);
}

function toNumber(string) {
  const matches = /(\d+)/.exec(string);
  return matches && matches[0] ? +matches[0] : 0;
}

module.exports = {
  exists,
  parseData,
  getRangeSize,
  getSmallest,
  toNumber,
};
