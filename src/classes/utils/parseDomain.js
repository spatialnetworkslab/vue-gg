export default function (domainSpecification, variableDomains, variableMetadata) {
  let domain

  if (![Array, String, Function].includes(domainSpecification.constructor)) {
    throw new Error('Invalid domain specification: only Array, String or Function allowed')
  }

  if (domainSpecification.constructor === Array) {
    domain = domainSpecification
  } else {
    if (variableDomains) {
      if (domainSpecification.constructor === Function) {
        let dataType = domainSpecification(variableMetadata.variables).type
        if (!['ratio', 'count'].includes(dataType)) {
          throw new Error(`Invalid variable type: only 'ratio' and 'count' allowed`)
        }

        domain = domainSpecification(variableDomains)
      }

      if (domainSpecification.constructor === String) {
        let dataType = variableMetadata.variables[domainSpecification].type
        if (!['ratio', 'count'].includes(dataType)) {
          throw new Error(`Invalid variable type: only 'ratio' and 'count' allowed`)
        }

        domain = variableDomains[domainSpecification]
      }
    } else {
      domain = [0, 1] // placeholder until real data is available
    }
  }

  return domain
}
