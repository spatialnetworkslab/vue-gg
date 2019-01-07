export function is (value) {
  return value !== undefined
}

export function isnt (value) {
  return value === undefined
}

export function invalid (value) {
  if (value === undefined || value === null){ return true }

  if (value.constructor === Number) {
    return !isFinite(value)
  }

  return false
}
