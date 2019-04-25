import { json } from 'd3-fetch'

export function multipoints () {
  let geom = '/static/MultiPoints.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}
