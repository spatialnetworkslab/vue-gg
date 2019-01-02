export default function (range, scalingOptions) {
  let newRange = [range[0], range[1]]

  let updateRange = scalingOptions.range

  if (updateRange) {
    if (updateRange.constructor !== Array || updateRange.length !== 2) {
      throw new Error('Invalid range modification')
    }

    if (is(updateRange[0])) { newRange[0] = updateRange[0] }
    if (is(updateRange[1])) { newRange[1] = updateRange[1] }
  }

  return newRange
}

function is (val) {
  return val !== undefined && val !== null
}
