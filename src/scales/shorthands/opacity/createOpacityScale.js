import checkValidScale from '@/scales/utils/checkValidScale.js'
import updateDomain from '@/scales/utils/updateDomain.js'

import numeric from './numeric.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)

    return numeric[scale](updateDomain(domain, scalingOptions))
  }
}
