import checkValidScale from '../../utils/checkValidScale.js'
import updateDomain from '../../utils/updateDomain.js'
import updateRange from '../../utils/updateRange.js'

import quantitative from '../coords/quantitative.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'squareRoot'
    checkValidScale(prop, variableType, scale, quantitative)

    return quantitative[scale](
      updateDomain(domain, scalingOptions),
      updateRange(range, scalingOptions)
    )
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    if (scalingOptions.domain) {
      console.warn('Cannot modify categorical domain')
    }

    return categorical[scale](
      domain,
      updateRange(range, scalingOptions)
    )
  }
}
