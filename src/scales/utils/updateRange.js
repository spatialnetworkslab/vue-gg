export default function (range, scalingOptions) {
  let newRange

  if (range) {
    newRange = [range[0], range[1]]
  } else {
    range = [0, 10]
  }

  let updateRange = scalingOptions.range

  if (updateRange) {
    if (updateRange.constructor !== Array || updateRange.length !== 2) {
      throw new Error('Invalid domain modification')
    }

    if (is(updateRange[0])) { newRange[0] = updateRange[0] }
    if (is(updateRange[1])) { newRange[1] = updateRange[1] }
  }

  return newRange
}

function is (val) {
  return val !== undefined && val !== null
}
