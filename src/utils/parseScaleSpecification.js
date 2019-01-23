import getDataType from './getDataType.js'

export default function (scaleSpecification, dataInterface) {
  let domain
  let domainType
  let scaleOptions

  if (![Array, String, Object].includes(scaleSpecification.constructor)) {
    throw new Error('Invalid scale specification: only Array, String or Object allowed')
  }

  if (scaleSpecification.constructor === Array) {
    checkValidDomainArray(scaleSpecification)
    domain = scaleSpecification
    domainType = getDataType(domain[0])
    scaleOptions = {}
  }

  if (scaleSpecification.constructor === String) {
    if (dataInterface.ready()) {
      if (!dataInterface.hasColumn(scaleSpecification)) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }
      domain = dataInterface.getDomain(scaleSpecification)
      domainType = dataInterface.getType(scaleSpecification)
      scaleOptions = {}
    } else {
      domain = [0, 1] // placeholder until real data is available
      domainType = 'quantitative'
      scaleOptions = {}
    }
  }

  if (scaleSpecification.constructor === Object) {
    let variable = scaleSpecification.variable

    if (dataInterface.ready()) {
      if (!variable && !scaleSpecification.domain) {
        throw new Error('Invalid domain specification object')
      }

      if (variable && !dataInterface.hasColumn(variable)) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }

      if (variable) {
        domain = dataInterface.getDomain(variable)
        domainType = dataInterface.getType(variable)
        scaleOptions = scaleSpecification
      }

      if (!variable) {
        checkValidDomainArray(scaleSpecification.domain)
        domain = scaleSpecification.domain
        domainType = getDataType(domain[0])
        scaleOptions = scaleSpecification
      }
    }

    if (!dataInterface.ready()) {
      if (variable) {
        domain = [0, 1] // placeholder until real data is available
        domainType = 'quantitative'
        scaleOptions = {}
      } else if (scaleSpecification.domain) {
        checkValidDomainArray(scaleSpecification.domain)
        domain = scaleSpecification.domain
        domainType = getDataType(domain[0])
        scaleOptions = scaleSpecification
      } else {
        throw new Error('Invalid domain specification object')
      }
    }
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
  checkValidScalingOptions(domainType, scalingOptions)
  let newDomain = [domain[0], domain[1]]

  if (scalingOptions.absolute) {
    newDomain = [0, Math.max(...newDomain.map(value => Math.abs(value)))]
  }

  if (scalingOptions.domainMin) {
    newDomain[0] = scalingOptions.domainMin
  }

  if (scalingOptions.domainMax) {
    newDomain[1] = scalingOptions.domainMax
  }

  return newDomain
}

function checkValidScalingOptions (domainType, scalingOptions) {
  if (domainType === 'categorical') {
    if (hasAnyWrongProperty(scalingOptions)) {
      throw new Error(`Invalid scaling options for categorical domain: ${JSON.stringify(scalingOptions)}`)
    }
  }
  checkTypes(domainType)
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
