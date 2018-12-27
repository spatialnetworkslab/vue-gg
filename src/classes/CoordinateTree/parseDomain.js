import getDataType from '../../utils/getDataType.js'

export default function (domainSpecification, variableDomains) {
  let domain
  let domainType
  let scaleOptions

  if (![Array, String, Object].includes(domainSpecification.constructor)) {
    throw new Error('Invalid domain specification: only Array, String or Object allowed')
  }

  if (domainSpecification.constructor === Array) {
    checkValidDomainArray(domainSpecification)
    domain = domainSpecification
    domainType = getDataType(domain[0])
    scaleOptions = {}
  }

  if (domainSpecification.constructor === String) {
    if (variableDomains) {
      if (!variableDomains[domainSpecification]) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }

      domain = variableDomains[domainSpecification]
      domainType = getDataType(domain[0])
      scaleOptions = {}
    } else {
      domain = [0, 1] // placeholder until real data is available
      domainType = 'quantitative'
      scaleOptions = {}
    }
  }

  if (domainSpecification.constructor === Object) {
    let variable = domainSpecification.variable

    if (variableDomains) {
      if (!variable || !domainSpecification.domain) {
        throw new Error('Invalid domain specification object')
      }

      if (variable && !variableDomains[variable]) {
        throw new Error(`Invalid domain specification: variable does not exist`)
      }

      if (variable) {
        domain = variableDomains[variable]
        domainType = getDataType(domain[0])
        scaleOptions = domainSpecification
      }

      if (!variable) {
        checkValidDomainArray(domainSpecification.domain)
        domain = domainSpecification.domain
        domainType = getDataType(domain[0])
        scaleOptions = domainSpecification
      }
    }

    if (!variableDomains) {
      if (variable) {
        domain = [0, 1] // placeholder until real data is available
        domainType = 'quantitative'
        scaleOptions = {}
      } else if (domainSpecification.domain) {
        checkValidDomainArray(domainSpecification.domain)
        domain = domainSpecification.domain
        domainType = getDataType(domain[0])
        scaleOptions = domainSpecification
      } else {
        throw new Error('Invalid domain specification object')
      }
    }
  }

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
