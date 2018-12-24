import getDataType from '@/utils/getDataType.js'

export default function (domainSpecification, variableDomains) {
  let domain
  let domainType

  if (![Array, String].includes(domainSpecification.constructor)) {
    throw new Error('Invalid domain specification: only Array or String allowed')
  }

  if (domainSpecification.constructor === Array) {
    checkValidDomainArray(domainSpecification)
    domainType = getDataType(domainSpecification[0])

    domain = domainSpecification
  } else {
    if (variableDomains) {
      if (domainSpecification.constructor === String) {
        if (!variableDomains[domainSpecification]) {
          throw new Error(`Invalid domain specification: variable does not exist`)
        }

        domain = variableDomains[domainSpecification]
        domainType = getDataType(domain[0])
      }
    } else {
      domain = [0, 1] // placeholder until real data is available
      domainType = 'quantitative'
    }
  }

  return [domain, domainType]
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
