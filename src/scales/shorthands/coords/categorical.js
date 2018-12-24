export default {
  equidistant
}

// TODO better name
function equidistant (domain, range, padStart = 0, padEnd = 0) {
  let deltaRange = range[1] - range[0]
  let paddedRange = deltaRange - padStart - padEnd

  let sections = domain.length
  let sectionLength = paddedRange / sections

  let mapping = {}
  let i = 0

  domain.forEach(entry => {
    mapping[entry] = range[0] + padStart + (i * sectionLength) + (sectionLength / 2)
    i++
  })

  return x => {
    return mapping[x]
  }
}
