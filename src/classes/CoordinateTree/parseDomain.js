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
    domainType = getDataType(domainSpecification[0])

    domain = domainSpecification
    scaleOptions = {}
  } else {
    if (variableDomains) {
      if (domainSpecification.constructor === String) {
        if (!variableDomains[domainSpecification]) {
          throw new Error(`Invalid domain specification: variable does not exist`)
        }

        domain = variableDomains[domainSpecification]
        domainType = getDataType(domain[0])
        scaleOptions = {}
      }

      if (domainSpecification.constructor === Object) {
        let variable = domainSpecification.variable
        if (!variable || variable.constructor !== String) {
          throw new Error('Domain specification object must have variable key of type String')
        }

        if (!variableDomains[variable]) {
          throw new Error(`Invalid domain specification: variable does not exist`)
        }

        domain = variableDomains[variable]
        domainType = getDataType(domain[0])
        scaleOptions = domainSpecification
      }
    } else {
      domain = [0, 1] // placeholder until real data is available
      domainType = 'quantitative'
      scaleOptions = {}
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
