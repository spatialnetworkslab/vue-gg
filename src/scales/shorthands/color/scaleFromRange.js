export default function (domain, range) {
  let mapping = {}
  let i = 0

  if (domain.length > range.length) {
    console.warn('Length of domain array is greater than length of range array. Scaling will wrap around range given.')
  } else if (domain.length < range.length) {
    console.warn('Length of domain array is smaller than length of range array. Scaling will only be until end of domain given.')
  }

  domain.forEach(entry => {
    mapping[entry] = range[i % range.length]
    i++
  })

  return x => {
    return mapping[x]
  }
}
