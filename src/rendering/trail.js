import checkPoints from '../mixins/Marks/utils/checkPoints.js'
import { invalidPoint } from '../utils/equals.js'
import createSVGStyle from '../mixins/Marks/utils/createSVGStyle.js'
import * as d3 from 'd3-path'

export function renderSVG (
  createElement, $$transform, props, events, addToSpatialIndex
) {
  checkPoints(props.points, props.geometry, props.x, props.y, props.x2, props.y2, props._area)

  if (props.points || (props.x && props.y)) {
    let points = []
    if (props.points && props.points.length > 1) {
      let x = []
      let y = []
      for (let i = 0; i < props.points.length; i++) {
        if (props.points[i]) {
          if (props.points[i][0] && props.points[i][1]) {
            x.push(props.points[i][0])
            y.push(props.points[i][1])
          } else {
            console.warn('Skipped invalid point ' + props.points[i] + ' at index ' + i)
          }
        }
      }
      points = generatePoints(x, y, props, $$transform)
    } else {
      points = generatePoints(props.x, props.y, props, $$transform)
    }

    // sort points while carrying aesthetics, namely stroke widths
    if (points.length > 1) {
      if (props.sort) {
        points = sortPoints(points, props.sort)
      }

      if (props.close) {
        points = closePoints(points)
      }

      if (events) {
        addToSpatialIndex(points, events)
      }

      // obtains path of trail mark
      let segments = createTrail(points)

      let totalAesthetics = {
        'stroke': 'none',
        'fill': props.fill,
        'fillOpacity': props.fillOpacity,
        'opacity': props.opacity
      }

      let element = createElement('path', {
        attrs: {
          'd': segments
        },
        style: createSVGStyle(totalAesthetics)
      })

      return element
    } else {
      console.warn('Not enough valid points to draw Mark')
    }
  } else {
    console.warn('Not enough valid points to draw Mark')
  }
}

//
// HELPERS
//

// This function generates the x-y coordinates + corresponding aesthetics
// that need to be sorted alongside one another
function generatePoints (x, y, props, $$transform) {
  let points = []
  let point = {}
  if (x.length !== y.length) {
    // x and y arrays should have equal length
    // if not we throw an error EXCEPT when one of the two arrays
    // has length 1, in which case we reuse that value for all points
    // relevant mappable aesthetics are stored alongside the coordinates for sorting purposes
    if (x.length === 1 || y.length === 1) {
      if (x.length === 1) {
        for (let i = 0; i < y.length; ++i) {
          point = { coord: [x, y[i]] }
          for (let row of mappable) {
            point = storeAesthetic(point, props, row, i)
          }
        }
      } else if (y.length === 1) {
        for (let i = 0; i < x.length; ++i) {
          point = { coord: [x[i], y] }
          for (let row of mappable) {
            point = storeAesthetic(point, props, row, i)
          }
          points.push(point)
        }
      }
    } else {
      throw new Error(`'x' and 'y' coordinate sets have different lengths`)
    }
  } else {
    for (let i = 0; i < x.length; ++i) {
      point = { coord: $$transform([x[i], y[i]]) }
      for (let row of mappable) {
        point = storeAesthetic(point, props, row, i)
      }
      points.push(point)
    }
  }

  return filterInvalid(points)
}

// This function stores the aesthetic or the value corresponding to the index inside the aesthetic
function storeAesthetic (point, aesthetics, aesKey, index) {
  if (Array.isArray(aesthetics[aesKey])) {
    if (!isNaN(aesthetics[aesKey][index])) {
      point[aesKey] = aesthetics[aesKey][index]
    } else {
      point[aesKey] = aesthetics[aesKey][aesthetics.length - 1]
      console.warn(`Undefined value for ${JSON.stringify(point.coord)} at index ${index} for ${aesKey}, using previous value aesthetics ${[aesKey][aesthetics.length - 1]}`)
    }
  } else {
    point[aesKey] = aesthetics[aesKey]
  }
  return point
}

// This function filters invalid points based on the coordinate element in the point object
function filterInvalid (points) {
  let filtered = []
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    if (invalidPoint(point.coord)) {
      console.warn(`Skipped invalid point ${JSON.stringify(point.coord)} at index ${i}`)
    } else {
      filtered.push(point)
    }
  }
  return filtered
}

// This function sorts points according to the x or y coordinate, bringing along with it
// the aesthetics attached to the point
function sortPoints (points, sortDimension) {
  if (sortDimension === 'x') {
    return points.sort((a, b) => a.coord[0] - b.coord[0])
  }
  if (sortDimension === 'y') {
    return points.sort((a, b) => a.coord[1] - b.coord[1])
  }
}

function closePoints (points) {
  // Check if polygon is closed
  let lastID = points.length - 1

  if (points[0].coord[0] !== points[lastID].coord[0] ||
    points[0].coord[1] !== points[lastID].coord[1]) {
    // If not, close
    points.push(points[0])
  }

  return points
}

// Maps line aesthetics to the data and creates the segments wrt stroke widths
function createTrail (points) {
  let path = d3.path()

  for (let ix = 0; ix < points.length - 1; ix++) {
    // Get start and end coordinates of line segment
    let [x1, y1] = points[ix].coord
    let [x2, y2] = points[ix + 1].coord

    let w1 = points[ix].strokeWidth / 2
    let w2 = points[ix + 1].strokeWidth / 2

    // to prevent strokes from disappearing completely
    // when scaling turns width to 0
    if (w1 === 0) {
      w1 += 0.1
    }

    if (w2 === 0) {
      w2 += 0.1
    }

    // First calculate x and y offsets of main line
    let dX = x2 - x1
    let dY = y2 - y1

    // Calculate magnitude of main line
    let magnitude = Math.sqrt(dX ** 2 + dY ** 2)

    // Calculate unit vectors of main line
    let uX = dX / magnitude
    let uY = dY / magnitude

    // Calculate unit vectors of normal
    let normalX = -uY
    let normalY = uX

    // Calculate offset of normal in x an y directions
    // for starting point using strokewidth values at that point
    let rx1 = normalX * w1
    let ry1 = normalY * w1

    // Calculate offset of normal in x an y directions
    // for ending point using strokewidth values at that point
    let rx2 = normalX * w2
    let ry2 = normalY * w2

    // Calculate angle of arc
    // This value can be used for both start and end points
    // Since the angle of the normal at both points is the same
    let angle = Math.atan2(ry1, rx1)

    // Create a closed path for each segment in the multiline
    path.moveTo(x1 - rx1, y1 - ry1)
    path.lineTo(x2 - rx2, y2 - ry2)
    path.arc(x2, y2, w2, angle - Math.PI, angle)
    path.lineTo(x1 + rx1, y1 + ry1)
    path.arc(x1, y1, w1, angle, angle + Math.PI)
    path.closePath()
  }

  return path.toString()
}

// tracks what the functions should look for as mappable
// might add other properties later on (?) like linear gradients
const mappable = ['strokeWidth']
