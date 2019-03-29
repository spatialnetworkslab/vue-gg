import dataLength from '../utils/dataLength.js'
import Geostats from '../utils/geoStats.js'

export default function (data, binningObj) {
  if (binningObj.constructor !== Object) {
    throw new Error('Binning only accepts an Object')
  }

  let key = binningObj.groupBy
  if (key.constructor !== String) {
    throw new Error('groupBy only accepts a String variable name')
  }

  let method = binningObj.method
  if (!method) {
    console.warn('No binning method specified, defaulting to EqualInterval')
    method = 'EqualInterval'
  }
  if (method.constructor !== String) {
    console.warn('Binning method not recognized, defaulting to EqualInterval')
    method = 'EqualInterval'
  }

  let numClasses = binningObj.numClasses
  if (!numClasses) {
    console.warn('numClasses not specified, defaulting to 5')
    numClasses = 5
  }

  let variableData = data[key]
  if (!variableData) {
    throw new Error(`groupBy variable ${key} does not exist`)
  }
  // let geoStat = new Geostats(variableData)
  let geoStat = new Geostats(variableData)

  let ranges

  // Calculate ranges to obtain bins of a specified size
  if (method === 'IntervalSize') {
    let binSize = binningObj.binSize

    let domain = variableDomain(variableData)
    if (!binSize) {
      console.warn(`binSize not specified for IntervalSize binning, defaulting to ${(domain[1] - domain[0])}`)
      binSize = domain[1] - domain[0]
    }
    let binCount = Math.round((domain[1] - domain[0]) / binSize)

    ranges = rangeFromInterval(domain, binSize, binCount)
    let newData = bin(data, key, ranges)
    return newData
  } else if (method === 'EqualInterval') {
    ranges = geoStat.getClassEqInterval(numClasses)
  } else if (method === 'StandardDeviation') {
    ranges = geoStat.getClassStdDeviation(numClasses)
  } else if (method === 'ArithmeticProgression') {
    ranges = geoStat.getClassArithmeticProgression(numClasses)
  } else if (method === 'GeometricProgression') {
    ranges = geoStat.getClassGeometricProgression(numClasses)
  } else if (method === 'Quantile') {
    ranges = geoStat.getClassQuantile(numClasses)
  } else if (method === 'Jenks') {
    ranges = geoStat.getClassJenks(numClasses)
  } else if (method === 'Manual') {
    ranges = binningObj.manualClasses
  }

  ranges = pairRange(ranges)

  let newData = bin(data, key, ranges)
  return newData
}

// Extract domain of variable of interest
function variableDomain (column) {
  let asc = column.sort((a, b) => a - b)

  let domain = []
  domain.push(asc[0])
  domain.push(asc.pop())

  return domain
}

function rangeFromInterval (domain, interval, binCount) {
  let ranges = []

  // Ranges should start at the minimum value of variable of interest
  let lowerBound = domain[0]

  for (let i = 0; i < binCount; i++) {
    let upperBound = lowerBound + interval

    ranges.push([lowerBound, upperBound])

    lowerBound = upperBound
  }

  return ranges
}

function pairRange (ranges) {
  let l = ranges.length
  let newRange = []

  for (let i = 0; i < l - 1; i++) {
    newRange.push([ranges[i], ranges[i + 1]])
  }

  return newRange
}

function bin (data, variable, ranges) {
  let newData = { bins: ranges }

  let ix = 0

  // Create an empty array to store new dataFrames divided by range
  let bins = Array(ranges.length)

  let length = dataLength(data)

  // Loop through data
  while (ix < length) {
    let instance = data[variable][ix]

    // Find index of bin in which the instance belongs
    let binIndex = ranges.findIndex(el => instance >= el[0] && instance <= el[1])

    let newRow = bins[binIndex]

    // If dataFrame does not exist, create it
    if (!newRow) { newRow = {} }

    for (let col in data) {
      // If data key does not exist, create it
      if (!newRow[col]) {
        newRow[col] = [data[col][ix]]
      } else {
        newRow[col].push(data[col][ix])
      }
    }

    // Update the bins column with new dataFrame
    bins[binIndex] = newRow

    ix++
  }

  // Add new dataFrame column to newData
  newData.grouped = bins
  return newData
}
