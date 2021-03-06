import getDataType from '../../utils/getDataType.js'
import { invalid } from '../../utils/equals.js'
import { bboxFeatures } from '../../utils/geojson.js'

export default function (data, length) {
  let domains = {}
  let types = {}

  if (length === 0) {
    // Warn user if an empty dataframe was supplied
    console.warn('Empty dataframe: ')
    console.warn(JSON.stringify(data))
  }

  for (let key in data) {
    // We will try to guess the type from the first VALID value of each column.
    // If the dataframe has < 2 valid values, we will set a dummy domain.
    let col = data[key]

    // Get the first valid value and the total number of valid values
    let { firstValidValue, nValidValues } = getFirstValidValue(col, key, length)

    // Warn user if a column contains a lot of invalid values
    if (nValidValues / length < 0.5) {
      console.warn(`Column '${key}' contains more than 50% invalid values`)
    }

    if (nValidValues === 0) {
      types[key] = 'quantitative'
      domains[key] = [0, 1]

      console.warn(`Column '${key}' contains no valid values.`)
      console.warn('Using domain [0, 1] as placeholder.')
    } else {
      // Calculate the type based on the only valid value
      let type = getDataType(firstValidValue)
      types[key] = type

      if (isGeometry(key, type)) {
        let bbox = bboxFeatures(col)

        domains['geometry.x'] = bbox.x
        domains['geometry.y'] = bbox.y

        types['geometry.x'] = 'quantitative'
        types['geometry.y'] = 'quantitative'
      } else {
        let uniqueValues = calculateUniqueValues(col)

        if (nValidValues === 1) {
          let domain = initDummyDomain(type, firstValidValue)
          domains[key] = domain

          console.warn(`Column '${key}' contains only 1 valid value: ${firstValidValue}.`)
          console.warn(`Using domain ${JSON.stringify(domain)}`)
        } else if (uniqueValues === 1 && type !== 'categorical') {
          let domain = initDummyDomain(type, firstValidValue)
          domains[key] = domain

          console.warn(`Column '${key}' contains only 1 unique value: ${firstValidValue}.`)
          console.warn(`Using domain ${JSON.stringify(domain)}`)
        } else {
          domains[key] = initDomain(type)

          for (let i = 0; i < col.length; i++) {
            let value = col[i]

            if (!invalid(value)) {
              if (getDataType(value) !== type) {
                throw new Error(`Invalid column ${key}: column contains multiple data types`)
              }

              domains[key] = updateDomain(domains[key], value, type)
            }
          }
        }
      }
    }
  }

  return { domains, types }
}

function getFirstValidValue (col, colName, length) {
  let firstValidValue
  let nValidValues = 0

  for (let i = 0; i < length; i++) {
    if (!invalid(col[i])) {
      nValidValues++
      firstValidValue = firstValidValue || col[i]
    }
  }

  return { firstValidValue, nValidValues }
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
    case 'interval:quantitative': {
      domain = [Infinity, -Infinity]
      break
    }
    case 'interval:temporal': {
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

  if (type.startsWith('interval')) {
    let intervalType = type.split(':')[1]
    domain = updateDomain(domain, value[0], intervalType)
    domain = updateDomain(domain, value[1], intervalType)
  }

  return domain
}

function getDay (date, days) {
  return new Date(new Date().setDate(date.getDate() + days))
}

function initDummyDomain (type, value) {
  let domain

  if (type === 'quantitative') {
    domain = [value - 1, value + 1]
  }

  if (type === 'categorical') {
    domain = [value]
  }

  if (type === 'temporal') {
    domain = [getDay(value, -1), getDay(value, 1)]
  }

  if (type.startsWith('interval')) {
    domain = value
  }

  return domain
}

function calculateUniqueValues (col) {
  let uniqueVals = {}
  for (let val of col) {
    let str = JSON.stringify(val)
    uniqueVals[str] = 0
  }

  return Object.keys(uniqueVals).length
}

function isGeometry (colName, type) {
  if (colName === 'geometry' && type === 'geometry') { return true }

  if (colName === 'geometry') {
    if (type !== 'geometry') {
      throw new Error(`Data in column 'geometry' must be of type 'geometry'`)
    }
  } else {
    if (type === 'geometry') {
      throw new Error(`Data of type 'geometry' found in column '${colName}' (not allowed)`)
    }
  }
}
