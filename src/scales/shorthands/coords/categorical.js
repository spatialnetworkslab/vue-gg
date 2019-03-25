export default {
  equidistant
}

// TODO better name
function equidistant (domain, range) {
  let deltaRange = range[1] - range[0]

  let sections = domain.length
  let sectionLength = deltaRange / sections

  let mapping = {}
  let inverseMapping = []

  domain.forEach((entry, i) => {
    let lowerBound = range[0] + (i * sectionLength)
    let upperBound = lowerBound + sectionLength

    mapping[entry] = lowerBound + (sectionLength / 2)
    inverseMapping.push({ lowerBound, upperBound, entry })
  })

  let scale = x => {
    return mapping[x]
  }

  let invert = x => {
    for (let entry of inverseMapping) {
      if (x >= entry.lowerBound && x <= entry.upperBound) {
        return entry.entry
      }
    }

    return undefined
  }

  scale.invert = invert

  return scale
}
