import { json } from 'd3-fetch'

export function africa () {
  let geom = '/africa.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}