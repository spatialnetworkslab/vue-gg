import * as d3 from 'd3'
import { initDomains, updateDomains } from './calculateDomains.js'
import parseMetadata from './parseMetadata.js'
// const datasetTypes = ['dataFrame', 'geojson']
// const variableTypes = ['ratio', 'interval', 'count', 'temporal', 'ordinal', 'nominal']

export default class {
  constructor (data, metadataOriginal) {
    this._dataset = []
    this._metadata = {}
    this._domains = {}

    if (!metadataOriginal) {
      // If no metadata is provided, we will assume it's a dataFrame
      this.setDataFrame(data, metadataOriginal)
    }

    if (metadataOriginal) {
      // Determine data structure if a metadata object was passed.
      switch (metadataOriginal.type) {
        case 'dataFrame': {
          this.setDataFrame(data, metadataOriginal)
          break
        }
        case 'geojson': {
          this.setGeoJSON(data, metadataOriginal)
          break
        }
        default: throw new Error('Unknown type!')
      }
    }
  }

  setDataFrame (data, metadataOriginal) {
    if (data.constructor !== Array) {
      throw new Error('Data of type dataFrame must be passed as an array')
    }

    let firstRow = data[0]
    let metadataParsed = parseMetadata(metadataOriginal, firstRow)

    let domainPerVariable = initDomains(metadataParsed.variables)

    for (let row of data) {
      checkRowFormat(row, metadataParsed.variables)
      domainPerVariable = updateDomains(row, domainPerVariable, metadataParsed.variables)
    }

    for (let variable in domainPerVariable) {
      let domain = domainPerVariable[variable]

      let variableType = metadataParsed.variables[variable].type

      if (variableType === 'nominal') {
        domainPerVariable[variable] = [0, domain.size]
      } else if (variableType === 'temporal') {
        domainPerVariable[variable] = d3.extent(domain)
      } else {}
    }

    this._dataset = data
    this._metadata = metadataParsed
    this._domains = domainPerVariable
  }

  setGeoJSON (data, metadata) {
    if (data.constructor !== Object) {
      throw new Error('Data of type geojson must be passed as an object')
    }
    // TODO
  }

  getDataset () {
    return this._dataset
  }

  getVariableData (variable) {
    let result = []
    let data = this._dataset
    for (let row in data) {
      result.push(data[row][variable])
    }
    return result
  }

  getMetadata () {
    return this._metadata
  }

  getDomain (variable) {
    return this._domains[variable]
  }

  getDomains () {
    return this._domains
  }

  getVariableMetadata (variable) {
    return this._metadata.variables[variable]
  }

  forEachRow (callback) {
    this._dataset.forEach((row, index) => {
      callback(row, index)
    })
  }
}

///           ///
/// Utilities ///
//            ///
function checkRowFormat (row, requiredObjStructure) {
  // Check if it is an array of objects
  if (row.constructor !== Object) {
    throw new Error('Data array must contain only objects')
  }

  // Check if all have the same keys using variable metadata
  if (!objectsHaveSameKeys(row, requiredObjStructure)) {
    throw new Error('All objects in data array must have same keys')
  }
}

function objectsHaveSameKeys (...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), [])
  const union = new Set(allKeys)
  return objects.every(object => union.size === Object.keys(object).length)
}
