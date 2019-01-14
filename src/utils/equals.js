export function is (value) {
  return value !== undefined
}

export function isnt (value) {
  return value === undefined
}

export function invalid (value) {
  if (value === undefined || value === null) { return true }

  if (value.constructor === Number) {
    return !isFinite(value)
  }

  return false
}

export function invalidPoint (point) {
  return invalid(point) || invalid(point[0]) || invalid(point[1])
}
