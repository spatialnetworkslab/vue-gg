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
        throw new Error('Invalid data') // TODO: allow nested dataframes
      }
    default: throw new Error('Invalid data')
  }
}
