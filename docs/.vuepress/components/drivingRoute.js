import { json } from 'd3-fetch'

export function line () {
  let geom = '/driving_route.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}
