import { csv, json } from 'd3-fetch'

export function geo () {
  let hexAttr = '/static/africa.csv'
  let hexGeom = '/static/hex-africa.json'

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
