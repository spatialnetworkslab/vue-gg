export function mutate (data, mutateObj) {
  let i = 0
  let length = data[Object.keys(data)[0]].length

  let rowProxy = {}

  for (let colName in data) {
    Object.defineProperty(rowProxy, colName, {
      get: () => data[colName][i]
    })
  }

  for (let key in mutateObj) {
    data[key] = new Array(length)
  }

  while (i < length) {
    for (let key in mutateObj) {
      let mutateFunc = mutateObj[key]
      data[key][i] = mutateFunc(rowProxy)
    }

    i++
  }

  return data
}

export function transmute (data, mutateObj) {
  data = mutate(data, mutateObj)

  for (let key in data) {
    if (!mutateObj.hasOwnProperty(key)) {
      delete data[key]
    }
  }
}
