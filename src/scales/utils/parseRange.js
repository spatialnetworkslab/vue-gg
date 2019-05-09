import { is } from '../../utils/equals.js'

export default function (range, scalingOptions) {
  let newRange = JSON.parse(JSON.stringify(range))

  if (is(scalingOptions.range)) {
    newRange = scalingOptions.range
  }

  if (is(scalingOptions.rangeMin)) {
    newRange[0] = scalingOptions.rangeMin
  }

  if (is(scalingOptions.rangeMax)) {
    newRange[newRange.length - 1] = scalingOptions.rangeMax
  }

  return newRange
}
