export default function (data) {
  let emptyData = false
  if (data.constructor === Object) {
    if (data.hasOwnProperty('type') && data.type === 'FeatureCollection') {
      // GeoJSON
      emptyData = geojsonEmpty(data)
    } else {
      // Column oriented
      emptyData = colDataEmpty(data)
    }
  }

  if (data.constructor === Array) {
    // Row oriented
    emptyData = rowDataEmpty(data)
  }

  if (emptyData) {
    console.warn(`Empty dataframe: ${JSON.stringify(data)}. Not rendering children.`)
  }

  return emptyData
}

function geojsonEmpty (data) {
  return data.features.length === 0
}

function colDataEmpty (data) {
  if (Object.keys(data).length === 0) { return true }

  for (let key in data) {
    if (data[key].length === 0) {
      return true
    }
  }
  return false
}

function rowDataEmpty (data) {
  if (data.length === 0) { return true }
  if (data.length === 1) { return Object.keys(data[0]).length === 0 }
  return false
}
