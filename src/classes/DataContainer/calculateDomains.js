import * as d3 from 'd3'

export function initDomains (variablesMetadata) {
  let domainPerVariable = {}

  for (let variableKey in variablesMetadata) {
    let variableType = variablesMetadata[variableKey].type

    if (['ratio', 'count'].includes(variableType)) {
      domainPerVariable[variableKey] = [Infinity, -Infinity]
    }

    if (variableType === 'temporal') {
      // https://en.wikipedia.org/wiki/Unix_time
      domainPerVariable[variableKey] = [new Date('19 January 2038'), new Date(0)]
    }

    if (variableType === 'categorical') {
      domainPerVariable[variableKey] = new Set()
    }
  }

  return domainPerVariable
}

export function updateDomains (row, currentDomains, variableMetadata) {
  for (let variableKey in row) {
    let variableType = variableMetadata[variableKey].type
    let value = row[variableKey]
    let domain = currentDomains[variableKey]

    if (['ratio', 'count'].includes(variableType)) {
      if (domain[0] >= value) { domain[0] = value }
      if (domain[1] <= value) { domain[1] = value }
    }

    if (variableType === 'temporal') {
      let date

      if (variableMetadata[variableKey].format) {
        let format = d3.timeParse(variableMetadata[variableKey].format)
        date = format(value)
      } else {
        date = value
      }

      let epoch = date.getTime()

      if (domain[0].getTime() >= epoch) { domain[0] = date }
      if (domain[1].getTime() <= epoch) { domain[1] = date }
    }

    if (variableType === 'categorical') { domain.add(value) }
  }

  return currentDomains
}
