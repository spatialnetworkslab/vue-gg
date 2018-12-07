export function xy (xName, yName) {
  let data = []

  let a = Math.round(Math.random() * 10)
  let b = Math.round((Math.random() - 0.5) * 30)

  let getY = x => (a * x) + b + ((Math.random() - 0.5) * 3)

  for (let i = 0; i < 100; i++) {
    let row = {}
    row[xName] = i
    row[yName] = getY(i)
    data.push(row)
  }

  return data
}
