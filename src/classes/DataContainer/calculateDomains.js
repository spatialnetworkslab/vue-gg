import * as d3 from 'd3'

export function initDomains (variablesMetadata) {
  let domainPerVariable = {}

  for (let variableKey in variablesMetadata) {
    let variableType = variablesMetadata[variableKey].type

    if (['ratio', 'interval', 'count'].includes(variableType)) {
      domainPerVariable[variableKey] = [Infinity, -Infinity]
    }

    if (variableType === 'temporal') {
      domainPerVariable[variableKey] = []
    }

    if (variableType === 'ordinal') {
      // TODO
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

    if (variableType === 'nominal') { domain.add(value) }

    if (['ratio', 'count'].includes(variableType)) {
      if (domain[0] >= value) { domain[0] = value }
      if (domain[1] <= value) { domain[1] = value }
    }

    if (variableType === 'interval') {
      let currentMax = d3.max(value)
      let currentMin = d3.min(value)
      if (domain[0] >= currentMin) { domain[0] = currentMin }
      if (domain[1] <= currentMax) { domain[1] = currentMax }
    }

    if (variableType === 'temporal') {
      let format = d3.timeParse(variableMetadata[variableKey].format)
      let formatValue = format(value) 
      domain.push(formatValue)
    }

    if (variableType === 'ordinal') {
      // TODO
    }
  }

  return currentDomains
}

function guessType (value) {
  if (value.constructor === String) {
    return 'nominal'
  }

  if (value.constructor == Array) {
    return 'interval'
  }

  if (value.constructor === Number) {
    if (value % 1 === 0) {
      return 'count'
    } else {
      return 'ratio'
    }
  }

  if (value.constructor === Date) {
    return 'temporal'
  }
}
