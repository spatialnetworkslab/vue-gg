import getDataType from '../../utils/getDataType.js'

export default function (data) {
  let domains = {}
  let types = {}

  for (let key in data) {
    let col = data[key]
    let type = getDataType(col[0])
    types[key] = type

    domains[key] = initDomain(type)

    for (let i = 0; i < col.length; i++) {
      let value = col[i]
      if (getDataType(value) !== type) {
        throw new Error(`Invalid column ${key}: column contains multiple data types`)
      }

      domains[key] = updateDomain(domains[key], value, type)
    }
  }

  return { domains, types }
}

function initDomain (type) {
  let domain
  switch (type) {
    case 'quantitative': {
      domain = [Infinity, -Infinity]
      break
    }
    case 'categorical': {
      domain = []
      break
    }
    case 'temporal': {
      // https://en.wikipedia.org/wiki/Unix_time
      domain = [new Date('19 January 2038'), new Date(0)]
      break
    }
  }

  return domain
}

function updateDomain (domain, value, type) {
  if (type === 'quantitative') {
    if (domain[0] >= value) { domain[0] = value }
    if (domain[1] <= value) { domain[1] = value }
  }

  if (type === 'categorical') {
    if (!domain.includes(value)) { domain.push(value) }
  }

  if (type === 'temporal') {
    let epoch = value.getTime()

    if (domain[0].getTime() >= epoch) { domain[0] = value }
    if (domain[1].getTime() <= epoch) { domain[1] = value }
  }

  return domain
}
