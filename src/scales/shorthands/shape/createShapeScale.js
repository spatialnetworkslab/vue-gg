import checkValidScale from '../../utils/checkValidScale.js'
import scaleFromRange from './scaleFromRange.js'

import categorical from './categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'categorical') {
    if (scalingOptions.range) {
      return scaleFromRange(domain, scalingOptions.range)
    }

    let scale = scalingOptions.type || 'shape8'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain)
  }
}
