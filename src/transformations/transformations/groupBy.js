export default function (data, groupByInstructions) {
  return new GroupedData(data, groupByInstructions)
}

class GroupedData {
  constructor (data, groupByInstructions) {
    this.groupedColumns = getGroupedColumns(data, groupByInstructions)
    this.groups = groupBy(data, this.groupedColumns)
  }
}

function getGroupedColumns (data, groupByInstructions) {
  let con = groupByInstructions.constructor
  if (![String, Array].includes(con)) {
    throw new Error('groupBy can only be used with a string or array of strings')
  }

  let groupedColumns = con === String ? [groupByInstructions] : groupByInstructions

  for (let col of groupedColumns) {
    if (!data.hasOwnProperty(col)) {
      throw new Error(`Column '${col}' not found`)
    }
  }

  if (groupedColumns.length === Object.keys(data).length) {
    throw new Error('Cannot group by all columns')
  }

  return groupedColumns
}

// https://codereview.stackexchange.com/a/37132
// TODO make column-oriented
function groupBy (array, columns) {
  let fn = item => {
    return columns.map(col => item[col])
  }

  let groups = {}

  array.forEach(row => {
    let group = JSON.stringify(fn(row))
    groups[group] = groups[group] || []
    groups[group].push(row)
  })

  return Object.keys(groups).map(group => {
    return groups[group]
  })
}
