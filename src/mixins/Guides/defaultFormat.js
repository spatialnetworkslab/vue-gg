export default function (value) {
  if (value.constructor === Number) {
    let stringValue = value.toString()
    let length = stringValue.length
    if (length < 6) { return value.toString() }

    let nIntegers = stringValue.split('.')[0].length

    if (nIntegers > 4) {
      return Math.floor(value / 1000).toString() + 'k'
    } else {
      return round(stringValue, 5 - nIntegers)
    }
  }

  if (value.constructor === String) {
    if (value.length < 15) {
      return value
    } else {
      return value.slice(0, 14) + '...'
    }
  }
}

function round (value, decimals) {
  let z = 10 ** decimals
  return (Math.floor(value * z) / z).toString()
}
