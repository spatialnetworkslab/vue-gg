export default function (data, sortInstructions) {
  if (sortInstructions.constructor === Object) {
    return sort(data, sortInstructions)
  } else if (sortInstructions.constructor === Array) {
    for (let i = sortInstructions.length - 1; i >= 0; i--) {
      let instruction = sortInstructions[i]
      data = sort(data, instruction)
    }
    return data
  } else {
    throw new Error('arrange required a key-value object or array of key-value objects')
  }
}

// https://beta.observablehq.com/@mbostock/manipulating-flat-arrays
const sortFuncs = {
  'ascending': (a, b) => a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN,
  'descending': (a, b) => b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
}

function sort (data, sortInstructions) {
  if (Object.keys(sortInstructions).length !== 1) {
    throw new Error('Only one key-value pair allowed')
  }

  let variable = Object.keys(sortInstructions)[0]
  let sortMethod = sortInstructions[variable]

  let sortFunc
  if (sortMethod.constructor === String) {
    sortFunc = sortFuncs[sortMethod]
  }
  if (sortMethod.constructor === Function) {
    sortFunc = sortMethod
  }

  let column = data[variable]

  let indices = column.map((v, i) => i)
  let sortedIndices = indices.sort((a, b) => sortFunc(column[a], column[b]))

  for (let colName in data) {
    data[colName] = reorder(data[colName], sortedIndices)
  }

  return data
}

function reorder (column, indices) {
  return indices.map(i => column[i])
}
