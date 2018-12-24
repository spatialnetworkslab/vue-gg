import getDataType from '@/utils/getDataType.js'

export function initDomains (firstRow) {
  let domainPerVariable = {}

  for (let variableKey in firstRow) {
    let variableType = getDataType(firstRow[variableKey])

    if (variableType === 'numeric') {
      domainPerVariable[variableKey] = [Infinity, -Infinity]
    }

    if (variableType === 'categorical') {
      domainPerVariable[variableKey] = new Set()
    }

    if (variableType === 'temporal') {
      // https://en.wikipedia.org/wiki/Unix_time
      domainPerVariable[variableKey] = [new Date('19 January 2038'), new Date(0)]
    }

    // if (variableType === 'nested') {} // TODO
  }

  return domainPerVariable
}

export function updateDomains (row, currentDomains) {
  for (let variableKey in row) {
    let value = row[variableKey]
    let variableType = getDataType(value)
    let domain = currentDomains[variableKey]

    if (variableType === 'numeric') {
      if (domain[0] >= value) { domain[0] = value }
      if (domain[1] <= value) { domain[1] = value }
    }

    if (variableType === 'categorical') { domain.add(value) }

    if (variableType === 'temporal') {
      let epoch = value.getTime()

      if (domain[0].getTime() >= epoch) { domain[0] = value }
      if (domain[1].getTime() <= epoch) { domain[1] = value }
    }

    // if (variableType === 'nested') {} // TODO
  }

  return currentDomains
}
