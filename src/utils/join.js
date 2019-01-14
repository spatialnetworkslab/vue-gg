export function equijoin (lookupTable, mainTable, lookupKey, mainKey, select) {
  let ix = lookupTable.reduce((ix, row) => ix.set(row[lookupKey], row), new Map())

  let featureMap = mainTable.features.map(feat => {
    return select(ix.get(feat.properties[mainKey]), feat)
  })

  let copyMainTable = JSON.parse(JSON.stringify(mainTable))
  copyMainTable.features = featureMap
  return copyMainTable
}
