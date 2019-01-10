export default function (value) {
  switch (value.constructor) {
    case Number:
      return 'quantitative'
    case String:
      return 'categorical'
    case Date:
      return 'temporal'
    case Object:
      if (value.hasOwnProperty('type') && value.hasOwnProperty('coordinates')) {
        return 'geometry'
      } else {
        if (Object.values(value).every(val => val.constructor === Array)) {
          return 'nested'
        } else {
          throw new Error('Invalid data')
        }
      }
    default: throw new Error('Invalid data')
  }
}
