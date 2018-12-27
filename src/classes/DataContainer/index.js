import { initDomains, updateDomains } from './calculateDomains.js'
// const datasetTypes = ['dataFrame', 'geojson']
// const variableTypes = ['quantitative', 'temporal', 'categorical']

export default class {
  constructor (data, type) {
    this._dataset = []
    this._domains = {}

    if (!type) {
      // If no type is provided, we will assume it's a dataFrame
      this.setDataFrame(data)
    }

    if (type) {
      switch (type) {
        case 'dataFrame': {
          this.setDataFrame(data)
          break
        }
        case 'geojson': {
          this.setGeoJSON(data)
          break
        }
        default: throw new Error('Unknown type!')
      }
    }
  }

  setDataFrame (data) {
    if (data.constructor !== Array) {
      throw new Error('Data of type dataFrame must be passed as an array')
    }

    // Initialize domain object
    let firstRow = data[0]
    let domainPerVariable = initDomains(firstRow)

    // Find domains
    for (let row of data) {
      checkRowFormat(row, firstRow)
      domainPerVariable = updateDomains(row, domainPerVariable)
    }

    this._dataset = data
    this._domains = domainPerVariable
  }

  setGeoJSON (data) {
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

  hasVariable (variable) {
    return this._domains.hasOwnProperty(variable)
  }

  getDomain (variable) {
    return this._domains[variable]
  }

  getDomains () {
    return this._domains
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
function checkRowFormat (row, firstRow) {
  // Check if it is an array of objects
  if (row.constructor !== Object) {
    throw new Error('Data array must contain only objects')
  }

  // Check if all have the same keys using first row
  if (!objectsHaveSameKeys(row, firstRow)) {
    throw new Error('All objects in data array must have same keys')
  }
}

function objectsHaveSameKeys (...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), [])
  const union = new Set(allKeys)
  return objects.every(object => union.size === Object.keys(object).length)
}
