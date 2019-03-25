import { csv, json } from 'd3-fetch'

export function geo () {
  let hexAttr = '/africa.csv'
  let hexGeom = '/hex-africa.json'

  let urls = [hexAttr, hexGeom]
  let promises = []

  urls.forEach(url => {
    let ext = url.replace(/^.*\./, '')

    return ext === 'csv' ? promises.push(csv(url))
      : ext === 'json' ? promises.push(json(url))
        : 'unsupported file type'
  })

  return Promise.all(promises).then(values => {
    let attr = Object.freeze(values[0].map(d => {
      return {
        hex: d.hex,
        value: +d['total']
      }
    }))

    let geom = Object.freeze(Object.assign({}, values[1]))

    return { attr: attr, geom: geom }
  })
}

export function equijoin (lookupTable, mainTable, lookupKey, mainKey, select) {
  let ix = lookupTable.reduce((ix, row) => ix.set(row[lookupKey], row), new Map())

  let featureMap = mainTable.features.map(feat => {
    return select(ix.get(feat.properties[mainKey]), feat)
  })

  let copyMainTable = JSON.parse(JSON.stringify(mainTable))
  copyMainTable.features = featureMap
  return copyMainTable
}

