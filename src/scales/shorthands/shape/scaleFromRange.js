export default function (domain, ranges) {
  let mapping = {}
  let i = 0

  domain.forEach(entry => {
    mapping[entry] = ranges[i % ranges.length]
    i++
  })

  return x => {
    return mapping[x]
  }
}
