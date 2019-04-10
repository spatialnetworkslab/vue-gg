import { json } from 'd3-fetch'

export function cities () {
  let geom = '/CityPoints.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}