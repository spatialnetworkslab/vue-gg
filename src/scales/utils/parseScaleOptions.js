import { tickIncrement } from 'd3-array'
import getDataType from '../../utils/getDataType.js'
import { is } from '../../utils/equals.js'

export default function (passedScaleOptions, dataInterface, scaleManager) {
  let domain
  let domainType
  let scaleOptions

  // Check if no invalid options were passed
  if (![Array, String, Object].includes(passedScaleOptions.constructor)) {
    throw new Error('Invalid scale options: only Array, String or Object allowed')
  }

  if (passedScaleOptions.constructor === String) {
    if (passedScaleOptions.startsWith('#')) {
      return scaleManager.getScale(passedScaleOptions)
    } else {
      scaleOptions = { domain: passedScaleOptions }
    }
  } else if (passedScaleOptions.constructor === Array) {
    scaleOptions = { domain: passedScaleOptions }
  } else {
    if (!passedScaleOptions.domain) {
      throw new Error(`Invalid scale options: missing required option 'domain'`)
    }
    scaleOptions = passedScaleOptions
  }

  let domainConstructor = scaleOptions.domain.constructor

  if (domainConstructor === String) {
    // If the domain was specified as a String, we will have to check the
    // availability of the data
    if (dataInterface.ready()) {
      if (!dataInterface.hasColumn(scaleOptions.domain)) {
        throw new Error(`Invalid scale options: domain '${domain}' not found`)
      }

      if (scaleOptions.absolute) {
        domain = absoluteDomain(dataInterface.getColumn(scaleOptions.domain))
      } else {
        domain = dataInterface.getDomain(scaleOptions.domain)
      }

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

    if (scaleOptions.absolute) {
      domain = absoluteDomain(domain)
    }

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

function updateDomain (domain, domainType, scalingOptions, dataInterface) {
  if (validScalingOptions(domainType, scalingOptions)) {
    let newDomain = domain.slice()

    if (is(scalingOptions.domainMin)) {
      newDomain[0] = scalingOptions.domainMin
    }

    if (is(scalingOptions.domainMax)) {
      newDomain[1] = scalingOptions.domainMax
    }

    if (!(is(scalingOptions.domainMin) | is(scalingOptions.domainMax)) & domainType !== 'categorical') {
      // nice domains turned on by default for non-categorical domains
      // TODO specific logic for temporal domains
      let domainNice = true
      if (scalingOptions.nice) {
        domainNice = scalingOptions.nice
      }
      if (domainNice === true) {
        newDomain = nice(newDomain, 10)
      }
      if (Number.isInteger(domainNice)) {
        newDomain = nice(newDomain, domainNice)
      }
    }

    if (is(scalingOptions.reverse)) {
      if (scalingOptions.reverse === true) {
        newDomain.reverse()
      }
    }

    return newDomain
  } else { return domain }
}

function validScalingOptions (domainType, scalingOptions) {
  if (domainType === 'categorical') {
    if (hasAnyWrongProperty(scalingOptions)) {
      throw new Error(`Invalid scaling options for categorical domain: ${JSON.stringify(scalingOptions)}`)
    }
    return true
  } else {
    checkTypes(domainType, scalingOptions)
    return true
  }
}

function hasAnyWrongProperty (obj) {
  let keys = ['domainMin', 'domainMax', 'domainMid', 'absolute', 'nice']
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
      if (type.startsWith('interval')) {
        let intervalType = type.split(':')[1]
        if (propertyType !== intervalType) {
          throw new Error(`Invalid type for ${key}: '${propertyType}'. Expected type '${type}'`)
        }
      } else {
        if (propertyType !== type) {
          throw new Error(`Invalid type for ${key}: '${propertyType}'. Expected type '${type}'`)
        }
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

function nice (domain, count) {
  // adopted from d3-scale: https://github.com/d3/d3-scale
  domain = domain.slice()

  let i0 = 0
  let i1 = domain.length - 1
  let start = domain[i0]
  let stop = domain[i1]
  let step

  if (stop < start) {
    step = start
    start = stop
    stop = step
    step = i0
    i0 = i1
    i1 = step
  }

  step = tickIncrement(start, stop, count)

  if (step > 0) {
    start = Math.floor(start / step) * step
    stop = Math.ceil(stop / step) * step
    step = tickIncrement(start, stop, count)
  } else if (step < 0) {
    start = Math.ceil(start * step) / step
    stop = Math.floor(stop * step) / step
    step = tickIncrement(start, stop, count)
  }

  if (step > 0) {
    domain[i0] = Math.floor(start / step) * step
    domain[i1] = Math.ceil(stop / step) * step
  } else if (step < 0) {
    domain[i0] = Math.ceil(start * step) / step
    domain[i1] = Math.floor(stop * step) / step
  }

  return domain
}
