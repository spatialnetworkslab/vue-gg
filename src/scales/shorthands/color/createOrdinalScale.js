export default function (orderedCategories, scale, quantitativeScales) {
  let numberOfCategories = orderedCategories.length
  let domain = [0, numberOfCategories - 1]

  let lookup = {}
  // If the categories are not strings (so arrays of smth) we will always stringify
  // them.
  let s = orderedCategories[0].constructor !== String ? JSON.stringify : x => x

  orderedCategories.forEach((v, i) => {
    lookup[s(v)] = i
  })

  let quantitativeScale = quantitativeScales[scale](domain)

  let ordinalScale = cat => {
    console.log(cat)
    return quantitativeScale(lookup[s(cat)])
  }
  return ordinalScale
}
