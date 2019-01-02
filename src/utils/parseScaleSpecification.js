import getDataType from './getDataType.js'

export default function (scaleSpecification, variableDomains) {
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
    if (variableDomains) {
      if (!variableDomains[scaleSpecification]) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }

      domain = variableDomains[scaleSpecification]
      domainType = getDataType(domain[0])
      scaleOptions = {}
    } else {
      domain = [0, 1] // placeholder until real data is available
      domainType = 'quantitative'
      scaleOptions = {}
    }
  }

  if (scaleSpecification.constructor === Object) {
    let variable = scaleSpecification.variable

    if (variableDomains) {
      if (!variable && !scaleSpecification.domain) {
        throw new Error('Invalid domain specification object')
      }

      if (variable && !variableDomains[variable]) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }

      if (variable) {
        domain = variableDomains[variable]
        domainType = getDataType(domain[0])
        scaleOptions = scaleSpecification
      }

      if (!variable) {
        checkValidDomainArray(scaleSpecification.domain)
        domain = scaleSpecification.domain
        domainType = getDataType(domain[0])
        scaleOptions = scaleSpecification
      }
    }

    if (!variableDomains) {
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
    for (let i = 1; i < array.length; i++) {
      if (array[i].constructor !== Date) { invalid = true; break }
    }
  }

  if (invalid) { throw new Error('Invalid domain specification array') }
}

function updateDomain (domain, domainType, scalingOptions) {
  if (domainType === 'categorical') {
    return domain
  } else {
    let newDomain = [domain[0], domain[1]]

    if (scalingOptions.absolute) {
      newDomain = [0, Math.max(...newDomain.map(value => Math.abs(value)))]
    }

    let updateDomain = scalingOptions.domain

    if (updateDomain) {
      if (updateDomain.constructor !== Array && updateDomain.length !== 2) {
        throw new Error('Invalid domain modification')
      }

      if (is(updateDomain[0])) { newDomain[0] = updateDomain[0] }
      if (is(updateDomain[1])) { newDomain[1] = updateDomain[1] }
    }

    return newDomain
  }
}

function is (val) {
  return val !== undefined && val !== null
}
