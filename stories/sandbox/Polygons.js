import { json } from 'd3-fetch'

export function polygons () {
  let geom = '/static/Polygons.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}
