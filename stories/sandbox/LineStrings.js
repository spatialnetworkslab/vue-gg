import { json } from 'd3-fetch'

export function linestrings () {
  let geom = '/static/LineStrings.json'

  return json(geom).then(values => {
    return Object.freeze(Object.assign({}, values))
  })
}
