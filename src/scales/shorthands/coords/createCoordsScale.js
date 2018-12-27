import checkValidScale from '../../utils/checkValidScale.js'
import updateDomain from '../../utils/updateDomain.js'
import updateRange from '../../utils/updateRange.js'

import numeric from './numeric.js'
import temporal from './temporal.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)

    return numeric[scale](
      updateDomain(domain, scalingOptions),
      updateRange(range, scalingOptions)
    )
  }

  if (variableType === 'temporal') {
    let scale = scalingOptions.scale || 'temporal'
    checkValidScale(prop, variableType, scale, temporal)

    return temporal[scale](domain, range)
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain, range)
  }
}
