import calculateDomains from './calculateDomains.js'
// const formats = ['row', 'column', 'geojson']
// const variableTypes = ['quantitative', 'temporal', 'categorical']

export default class {
  constructor (data, format) {
    this._dataset = {}
    this._domains = {}

    if (!format) {
      // If no type is provided, we will assume it's a dataFrame.
      // Now we just have to determine if it's column or row oriented.
      if (data.constructor === Object) {
        // Column oriented
        this.setColDataFrame(data)
      }

      if (data.constructor === Array) {
        // Row oriented
        this.setRowDataFrame(data)
      }
    }

    if (format) {
      switch (format) {
        case 'column': {
          this.setColDataFrame(data)
          break
        }
        case 'row': {
          this.setRowDataFrame(data)
          break
        }
        case 'geojson': {
          this.setGeoJSON(data)
          break
        }
        default: throw new Error('Unknown format!')
      }
    }
  }

  setColDataFrame (data) {
    let length = checkFormat(data)

    this._length = length
    this._dataset = data

    let { domains, types } = calculateDomains(data, length)
    this._domains = domains
    this._types = types
  }

  setRowDataFrame (data) {
    if (data.constructor !== Array) {
      throw new Error('Data in row-format must be passed as an array of objects')
    }

    let columnDataFrame = initColumnDF(data)

    for (let row of data) {
      for (let key in row) {
        columnDataFrame[key].push(row[key])
      }
    }

    this.setColDataFrame(columnDataFrame)
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

  hasVariable (variable) {
    return this._domains.hasOwnProperty(variable)
  }

  getDomain (variable) {
    return this._domains[variable]
  }

  getDomains () {
    return this._domains
  }

  getColumn (variable) {
    return this._dataset[variable]
  }

  forEachRow (fn) {
    let data = this._dataset

    for (let i = 0; i < this._length; i++) {
      let row = {}
      for (let colName in data) { row[colName] = data[colName][i] }
      fn(row, i)
    }
  }
}

function checkFormat (data) {
  if (data.constructor !== Object) {
    throw new Error('Data in column-format must be passed as an object of arrays')
  }

  let len = null

  for (let key in data) {
    let col = data[key]
    if (col.constructor !== Array) {
      throw new Error('Data in column-format must be passed as an object of arrays')
    }

    if (len === null) {
      len = col.length
    } else {
      if (len !== col.length) {
        throw new Error('Invalid data: columns must be of same length')
      }
    }
  }

  return len
}

function initColumnDF (data) {
  let firstRow = data[0]

  if (firstRow.constructor !== Object) {
    throw new Error('Empty dataframe (0 rows)')
  }

  let columnKeys = Object.keys(firstRow)

  let columnDataFrame = {}

  for (let key of columnKeys) {
    columnDataFrame[key] = []
  }

  return columnDataFrame
}
