import calculateDomains from './calculateDomains.js'
// const formats = ['row', 'column', 'geojson']
// const variableTypes = ['quantitative', 'temporal', 'categorical']

export default class {
  constructor (data, format) {
    this._dataset = []
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
        default: throw new Error('Unknown type!')
      }
    }
  }

  setColDataFrame (data) {
    let length = checkFormat(data)

    let { domains, types } = calculateDomains(data)

    this._length = length
    this._dataset = data
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

    // initialize column data frame
    let cols = {}
    let geometryBBox
    let firstFeature = data.features[0]
    let colNames = ['geometry', ...Object.keys(firstFeature.properties)]
    for (let name of colNames) { cols[name] = [] }

    data.features.forEach(feat => {
      let geometry = extractGeometry(feat)
      geometryBBox = getBBox(geometry)
      let attributes = extractAttributes(feat)

      // create columns
      cols.geometry.push(geometry)
      for (let colName in attributes) { cols[colName].push(attributes[colName]) }
    })

    let length = checkFormat(cols)

    // calculate domain for each column except for the geometry column
    let attributeCols = Object.assign(...Object.keys(cols)
      .filter(key => key !== 'geometry')
      .map(key => ({ [key]: cols[key] })))

    let { domains, types } = calculateDomains(attributeCols)

    domains.geometry = geometryBBox
    types.geometry = 'geometry'

    this._length = length
    this._dataset = cols
    this._domains = domains
    this._types = types
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
    let i = 0

    let rowProxy = {}
    let data = this._dataset

    for (let colName in data) {
      Object.defineProperty(rowProxy, colName, {
        get: () => data[colName][i]
      })
    }

    while (i < this._length) {
      fn(rowProxy, i)
      i++
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
  let columnKeys = Object.keys(firstRow)

  let columnDataFrame = {}

  for (let key of columnKeys) {
    columnDataFrame[key] = []
  }

  return columnDataFrame
}

function extractGeometry (feat) {
  return feat.geometry
}

function extractAttributes (feat) {
  return feat.properties
}

function flattenCoordArr (geometry) {
  return geometry.type === 'Polygon' ? geometry.coordinates.flat()
    : geometry.type === 'MultiPolygon' ? geometry.coordinates.flat(2)
      : 'geometry type is not known'
}

function getBBox (geometry) {
  let bounds = {}
  let lon, lat

  let coords = flattenCoordArr(geometry)

  coords.forEach(coord => {
    lon = coord[0]
    lat = coord[1]

    bounds.xMin = bounds.xMin < lon ? bounds.xMin : lon
    bounds.xMax = bounds.xMax > lon ? bounds.xMax : lon
    bounds.yMin = bounds.yMin < lat ? bounds.yMin : lat
    bounds.yMax = bounds.yMax > lat ? bounds.yMax : lat
  })

  return { x: [bounds.xMin, bounds.xMax], y: [bounds.yMin, bounds.yMax] }
}
