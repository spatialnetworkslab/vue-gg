export default function (orderedCategories, scale, quantitativeScales, range) {
  let numberOfCategories = orderedCategories.length
  let domain = [0, numberOfCategories - 1]

  let lookup = {}
  // If the categories are not strings (so arrays of smth) we will always stringify
  // them.
  let s = orderedCategories[0].constructor !== String ? JSON.stringify : x => x

  orderedCategories.forEach((v, i) => {
    lookup[s(v)] = i
  })

  let quantitativeScale
  if (range) {
    quantitativeScale = quantitativeScales[scale](domain, range)
  } else {
    quantitativeScale = quantitativeScales[scale](domain)
  }

  let ordinalScale = cat => {
    return quantitativeScale(lookup[s(cat)])
  }
  return ordinalScale
}
