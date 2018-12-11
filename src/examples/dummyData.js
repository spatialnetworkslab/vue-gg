export function xy (xName, yName, errorRange = 20) {
  let data = []

  let a = Math.round(Math.random() * 10)
  let b = Math.round((Math.random() - 0.5) * 30)

  let getY = x => (a * x) + b + ((Math.random() - 0.5) * errorRange * 2)

  for (let i = 0; i < 100; i++) {
    let row = {}
    row[xName] = i
    row[yName] = getY(i)
    data.push(row)
  }

  return data
}

export function bars (xName, yName) {
  let data = []
  let fruits = [
    'apple',
    'banana',
    'kiwi',
    'pomelo',
    'jackfruit',
    'guava',
    'cherry',
    'dragonfruit',
    'grape',
    'durian'
  ]

  for (let i = 0; i < 10; i++) {
    let row = {}
    row[xName] = fruits[i]
    row[yName] = Math.round(Math.random() * 100)
    data.push(row)
  }

  return data
}
