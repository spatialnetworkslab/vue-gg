export default function (domain, ranges) {
  let mapping = {}
  let i = 0

  if (domain.length > ranges.length) {
        console.warn('Length of domain array is greater than length of ranges array. Scaling will wrap around ranges array.')
  } else if (domain.length < ranges.length) {
    console.warn('Length of domain array is smaller than length of ranges array. Scaling will only be till end of domain array.')
  }
  domain.forEach(entry => {
    mapping[entry] = ranges[i % ranges.length]
    i++
  })

  return x => {
    return mapping[x]
  }
}
