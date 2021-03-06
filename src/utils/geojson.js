import { coordEach } from '@turf/meta'
import { geoPath } from 'd3-geo'
import { invalid } from './equals.js'

export function transformFeatures (features, transformation) {
  return features.map(feature => transform(feature, transformation))
}

export function transform (feature, transformation) {
  let featureClone = JSON.parse(JSON.stringify(feature))
  coordEach(featureClone, coord => {
    let [x, y] = transformation(coord)
    coord[0] = x
    coord[1] = y
  })
  return featureClone
}

export function bboxFeatures (features) {
  let bbox = [[Infinity, Infinity], [-Infinity, -Infinity]]

  features.forEach(feature => {
    if (!invalid(feature)) {
      bbox = updateBBox(bbox, feature)
    }
  })

  let bboxObj = {
    x: [bbox[0][0], bbox[1][0]],
    y: [bbox[0][1], bbox[1][1]]
  }

  return bboxObj
}

const path = geoPath()

function updateBBox (bbox, geometry) {
  let newBBox = path.bounds(geometry)

  bbox[0][0] = bbox[0][0] < newBBox[0][0] ? bbox[0][0] : newBBox[0][0]
  bbox[0][1] = bbox[0][1] < newBBox[0][1] ? bbox[0][1] : newBBox[0][1]
  bbox[1][0] = bbox[1][0] > newBBox[1][0] ? bbox[1][0] : newBBox[1][0]
  bbox[1][1] = bbox[1][1] > newBBox[1][1] ? bbox[1][1] : newBBox[1][1]

  return bbox
}
