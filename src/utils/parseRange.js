import { is } from './equals.js'

export default function (range, scalingOptions) {
  let newRange = [range[0], range[1]]

  if (is(scalingOptions.rangeMin)) {
    newRange[0] = scalingOptions.domainMin
  }

  if (is(scalingOptions.rangeMax)) {
    newRange[1] = scalingOptions.domainMax
  }

  return newRange
}
