export default function (value, throwError) {
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
          if (throwError) {
            throw new Error('Invalid data')
          } else {
            return undefined
          }
        }
      }
    default:
      if (throwError) {
        throw new Error('Invalid data')
      } else {
        return undefined
      }
  }
}
