export default function (domain, range) {
  let mapping = {}
  let i = 0

  domain.forEach(entry => {
    mapping[entry] = range[i % range.length]
    i++
  })

  return x => {
    return mapping[x]
  }
}
