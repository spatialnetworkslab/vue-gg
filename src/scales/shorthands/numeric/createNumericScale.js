import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from '../coords/quantitative.js'
import categorical from '../coords/categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  let range
  if (['opacity', 'strokeOpacity', 'fillOpacity'].includes(prop)) {
    range = [0, 1]
  }

  if (['width', 'height', 'fontSize', 'strokeWidth', 'size'].includes(prop)) {
    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 10]`)
      range = [0, 10]
    } else { range = scalingOptions.range }
  }

  if (prop === 'radius') {
    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 8]`)
      range = [0, 8]
    } else { range = scalingOptions.range }
  }

  if (variableType === 'quantitative') {
    let defaultScale = ['radius', 'fontSize'].includes(prop) ? 'squareRoot' : 'linear'
    let scale = scalingOptions.type || defaultScale

    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](domain, range)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.type || 'fullExtent'
    checkValidScale(prop, variableType, scale, categorical)

    if (!scalingOptions.order) {
      console.warn(`Prop '${prop}': no order given for categories. Using order of appearance.`)
    }

    return categorical[scale](domain, range)
  }
}
