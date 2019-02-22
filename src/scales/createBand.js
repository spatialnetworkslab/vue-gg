import parseScaleOptions from './utils/parseScaleOptions.js'
import getDimension from '../utils/getDimension.js'
import parseRange from './utils/parseRange.js'
import getPrimitive from './utils/getPrimitive.js'

export default function (propKey, context, passedBandOptions) {
  if (!['w', 'h'].includes(propKey)) {
    throw new Error(`'band' is only allowed on 'w' and 'h' props, not '${propKey}'`)
  }

  let [domain, domainType, bandOptions] = parseScaleOptions(
    passedBandOptions,
    context.dataInterface,
    context.scaleManager
  )

  domainType = getPrimitive(domainType)

  if (domainType !== 'categorical') {
    throw new Error(`Domain ${JSON.stringify(domain)} has invalid type ${domainType}`)
  }

  let dimension = getDimension(propKey)
  let range = context.ranges[dimension]
  range = parseRange(range, bandOptions)

  let width = range[1] - range[0]
  let padding = bandOptions.padding || 0

  let numberOfCategories = domain.length
  let bandWidth = width / numberOfCategories
  bandWidth = bandWidth - padding * 2

  return bandWidth
}
