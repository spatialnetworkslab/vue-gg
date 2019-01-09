import { is, isnt } from '../../../utils/equals.js'

export default function (points, x, y) {
  if (is(points) && (is(x) && is(y))) {
    throw new Error(`Cannot have both 'points', and 'x' and 'y' props`)
  }

  if (isnt(points) && isnt(x) && isnt(y)) {
    throw new Error(`Missing required props (either 'points', or 'x' and 'y')`)
  }

  if (isnt(points) && !(is(x) && is(y))) {
    throw new Error(`Both 'x' and 'y' props must be specified`)
  }
}
