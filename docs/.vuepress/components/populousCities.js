import { json } from 'd3-fetch'

export function points () {
  let geom = '/populous_cities.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}
