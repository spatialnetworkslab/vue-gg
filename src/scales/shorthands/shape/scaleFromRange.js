export default function (domain, ranges) {
  let mapping = {}
  let i = 0

  if (domain.length > ranges.length) {
    console.warn('Length of domain array is greater than length of ranges array. Scaling will wrap around range given.')
  } else if (domain.length < ranges.length) {
    console.warn('Length of domain array is smaller than length of ranges array. Scaling will only be until end of domain given.')
  }
  
  domain.forEach(entry => {
    mapping[entry] = ranges[i % ranges.length]
    i++
  })

  return x => {
    return mapping[x]
  }
}
