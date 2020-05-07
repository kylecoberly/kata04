module.exports = {
  findDayWithSmallestRange,
  parseData,
  getRangeSize,
}

function findDayWithSmallestRange(data){
  const days = parseData(data)

  const dayWithSmallestRange = days.reduce(getDayWithSmallestRange)

  return dayWithSmallestRange["Dy"]
}

function getDayWithSmallestRange(currentSmallestDay, day){
  return (getRangeSize(day) < getRangeSize(currentSmallestDay))
    ? day
    : currentSmallestDay
}

function getRangeSize(day){
  const max = day["MxT"]
  const min = day["Mnt"]
  return max - min
}

function parseData(data){
  const lines = data.split('\n')
  if (!lines[3]) return []
  const days = lines.slice(3, -1)

  return days.map(dayTextToObject)
}

function dayTextToObject(day){
  const dayData = day.split(/\s/).filter(exists)
  return {
    Dy: +dayData[0],
    MxT: +dayData[1],
    Mnt: +dayData[2],
  }
}

function exists(x){
  return x
}

