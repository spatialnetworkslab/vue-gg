import { is } from '../../../utils/equals.js'

export default function (points, geometry, x, y, x2, y2, area) {
  if (area) {
    if (!(is(x) && is(y))) {
      throw new Error(`Missing required props 'x' and 'y'`)
    }
    if (!(is(x2) || is(y2))) {
      throw new Error(`Missing required 'x2' and/or 'y2' prop (need at least one of the two)`)
    }
  } else {
    if (is(geometry)) {
      if (is(points) || is(x) || is(y)) {
        throw new Error(`Cannot have both 'geometry' and 'x', 'y' or 'points' props`)
      }
    } else if (is(points)) {
      if (is(x) || is(y)) {
        throw new Error(`Cannot have both 'geometry' and 'x', 'y' or 'points' props`)
      }
    } else if (!(is(x) && is(y))) {
      throw new Error('Missing required props')
    }
  }
}
