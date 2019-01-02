import checkValidScale from '../../utils/checkValidScale.js'
import updateRange from '../../utils/updateRange.js'

import quantitative from './quantitative.js'
import temporal from './temporal.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](
      domain,
      updateRange(range, scalingOptions)
    )

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'temporal') {
    let scale = scalingOptions.scale || 'temporal'
    checkValidScale(prop, variableType, scale, temporal)

    return temporal[scale](
      domain,
      updateRange(range, scalingOptions)
    )
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](
      domain,
      updateRange(range, scalingOptions)
    )
  }
}
