// https://stackoverflow.com/a/24468019/7237112
export default function (path, type) {
  let totalArea

  if (type === 'line') {
    totalArea = getArea(path)
  }

  if (type === 'polygon') {
    for (let index = 0; index < path.length; index++) {
      let points = path[index]
      let area = getArea(points)

      // Everything after index 0 are holes
      if (index === 0) {
        totalArea = area
      } else {
        totalArea = totalArea - area
      }
    }
  }

  return totalArea
}

function getArea (points) {
  let n = points.length
  let area = 0

  for (let i = 0; i < n; i++) {
    let j = (i + 1) % n
    area += points[i][0] * points[j][1]
    area -= points[j][0] * points[i][1]
  }
  area = Math.abs(area) / 2
  return area
}
