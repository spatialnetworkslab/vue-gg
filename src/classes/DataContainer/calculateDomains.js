import * as d3 from 'd3'

export function initDomains (variablesMetadata) {
  let domainPerVariable = {}

  for (let variableKey in variablesMetadata) {
    let variableType = variablesMetadata[variableKey].type

    if (['ratio', 'count'].includes(variableType)) {
      domainPerVariable[variableKey] = [Infinity, -Infinity]
    }

    if (variableType === 'temporal') {
      domainPerVariable[variableKey] = []
    }

    if (variableType === 'nominal') {
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
      let format = d3.timeParse(variableMetadata[variableKey].format)
      let formatValue = format(value)
      domain.push(formatValue)
    }

    if (variableType === 'nominal') { domain.add(value) }
  }

  return currentDomains
}
