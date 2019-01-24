import getDataType from '../../utils/getDataType.js'
import { is } from '../../utils/equals.js'

export default function (passedScaleOptions, dataInterface) {
  let domain
  let domainType
  let scaleOptions

  // Check if no invalid options were passed
  if (![Array, String, Object].includes(passedScaleOptions.constructor)) {
    throw new Error('Invalid scale options: only Array, String or Object allowed')
  }

  if ([Array, String].includes(passedScaleOptions.constructor)) {
    scaleOptions = { domain: passedScaleOptions }
  }

  if (!scaleOptions.domain) {
    throw new Error(`Invalid scale options: missing required option 'domain'`)
  }

  // Time to the right domain!
  let domainConstructor = scaleOptions.domain.constructor

  if (domainConstructor === String) {
    // If the domain was specified as a String, we will have to check the
    // availability of the data
    if (dataInterface.ready()) {
      if (!dataInterface.hasColumn(scaleOptions.domain)) {
        throw new Error(`Invalid scale options: domain '${domain}' not found`)
      }

      domain = dataInterface.getDomain(scaleOptions.domain)
      domainType = dataInterface.getType(scaleOptions.domain)
    } else {
      // If the data is not yet available, we will set a dummy domain
      domain = [0, 1]
      domainType = 'quantitative'
    }
  }

  if (domainConstructor === Array) {
    checkValidDomainArray(scaleOptions.domain)
    domain = scaleOptions.domain
    domainType = getDataType(domain[0])
  }

  domain = updateDomain(domain, domainType, scaleOptions)

  return [domain, domainType, scaleOptions]
}

function checkValidDomainArray (array) {
  if (array.length < 2) {
    throw new Error('Invalid domain specification array: length shorter than 2')
  }

  let invalid = false

  if (array[0].constructor === Number) {
    if (array[1].constructor !== Number || array.length !== 2) {
      invalid = true
    }
  } else if (array[0].constructor === String) {
    for (let i = 1; i < array.length; i++) {
      if (array[i].constructor !== String) { invalid = true; break }
    }
  } else if (array[0].constructor === Date) {
    if (array[1].constructor !== Date || array.length !== 2) {
      invalid = true
    }
  }

  if (invalid) { throw new Error('Invalid domain specification array') }
}

function updateDomain (domain, domainType, scalingOptions) {
  if (validScalingOptions(domainType, scalingOptions)) {
    let newDomain = [domain[0], domain[1]]

    if (scalingOptions.absolute) {
      newDomain = absoluteDomain(newDomain)
    }

    if (is(scalingOptions.domainMin)) {
      newDomain[0] = scalingOptions.domainMin
    }

    if (is(scalingOptions.domainMax)) {
      newDomain[1] = scalingOptions.domainMax
    }

    return newDomain
  } else { return domain }
}

function validScalingOptions (domainType, scalingOptions) {
  if (domainType === 'categorical') {
    if (hasAnyWrongProperty(scalingOptions)) {
      throw new Error(`Invalid scaling options for categorical domain: ${JSON.stringify(scalingOptions)}`)
    }
    return false
  } else {
    checkTypes(domainType, scalingOptions)
    return true
  }
}

function hasAnyWrongProperty (obj) {
  let keys = ['domainMin', 'domainMax', 'domainMid', 'absolute']
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) { return true }
  }
  return false
}

function checkTypes (type, obj) {
  let keys = ['domainMin', 'domainMax', 'domainMid']
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) {
      let propertyType = getDataType(obj[key])
      if (propertyType !== type) {
        throw new Error(`Invalid type for ${key}: '${propertyType}'. Expected type '${type}'`)
      }
    }
  }
}

function absoluteDomain (arr) {
  let min = Infinity
  let max = -Infinity

  for (let val of arr) {
    let absVal = Math.abs(val)
    min = absVal < min ? absVal : min
    max = absVal > max ? absVal : max
  }

  return [min, max]
}
