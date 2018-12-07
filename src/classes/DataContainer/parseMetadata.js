export default function (metadataOriginal, firstRow) {
  let metadata = JSON.parse(JSON.stringify(metadataOriginal || {}))
  // First check if metadata has variable metadata. If not: set it
  if (!metadata.variables) {
    metadata.variables = {}
  }

  // Make sure variable metadata doesn't have keys that are not in first row
  let rowKeys = Object.keys(firstRow)
  if (Object.keys(metadata.variables).some(key => !rowKeys.includes(key))) {
    throw new Error(`Keys in metadata not matching data`)
  }

  // Loop over fist row keys.
  for (let variableKey in firstRow) {
    // If no metadata was supplied, initialize the variable metadata.
    if (!metadata.variables[variableKey]) {
      metadata.variables[variableKey] = {}
    }

    // If variable metadata has no type attribute: try to guess the type
    if (!metadata.variables[variableKey].type) {
      let value = firstRow[variableKey]
      let variableType = inferVariableType(value)
      metadata.variables[variableKey].type = variableType
    }
  }

  return metadata
}

export function inferVariableType (value) {
  switch (value.constructor) {
    case String: {
      return 'nominal'
    }
    case Number: {
      return value % 1 === 0 ? 'count' : 'ratio'
    }
    case Date: {
      return 'temporal'
    }
    default: throw new Error('Failed to infer type. Please supply type for variable.')
  }
}
