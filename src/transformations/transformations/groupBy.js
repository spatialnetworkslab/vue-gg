export default function (data, groupByInstructions) {
  if (groupByInstructions.constructor === String) {

  } else if (groupByInstructions.constructor === Array) {

  } else {
    throw new Error('groupBy can only be used with a string or array of strings')
  }
}
