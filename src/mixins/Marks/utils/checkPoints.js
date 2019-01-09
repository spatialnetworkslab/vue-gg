import { is } from '../../../utils/equals.js'

export default function (points, geometry, x, y) {
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
