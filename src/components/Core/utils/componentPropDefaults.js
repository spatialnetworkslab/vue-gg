import Area from '../../Marks/Area.vue'
import Label from '../../Marks/Label.vue'
import Line from '../../Marks/Line.vue'
import MultiLine from '../../Marks/MultiLine.vue'
import Path from '../../Marks/Path.vue'
import Point from '../../Marks/Point.vue'
import Polygon from '../../Marks/Polygon.vue'
import Rectangle from '../../Marks/Rectangle.vue'
import Symbol from '../../Marks/Symbol.vue'
import Trail from '../../Marks/Trail.vue'

import PathMixin from '../../../mixins/Marks/Path.js'
import Rectangular from '../../../mixins/Marks/Rectangular.js'

const defaults = {}

function extractAllDefaults () {
  let pathMixinDefaults = extractDefaults(PathMixin)
  let rectangularMixinDefaults = extractDefaults(Rectangular)

  // vgg-area
  let areaMarkDefaults = extractDefaults(Area)
  defaults['vgg-area'] = mergeDefaults(pathMixinDefaults, areaMarkDefaults)

  // vgg-label
  defaults['vgg-label'] = extractDefaults(Label)

  // vgg-line
  defaults['vgg-line'] = extractDefaults(Line)

  // vgg-multi-line
  let multiLineDefaults = extractDefaults(MultiLine)
  defaults['vgg-multi-line'] = mergeDefaults(pathMixinDefaults, multiLineDefaults)

  // vgg-path
  let pathDefaults = extractDefaults(Path)
  defaults['vgg-path'] = mergeDefaults(pathMixinDefaults, pathDefaults)

  // vgg-point
  defaults['vgg-point'] = extractDefaults(Point)

  // vgg-polygon
  let polygonDefaults = extractDefaults(Polygon)
  defaults['vgg-polygon'] = mergeDefaults(pathMixinDefaults, polygonDefaults)

  // vgg-rectangle
  let rectangleDefaults = extractDefaults(Rectangle)
  defaults['vgg-rectangle'] = mergeDefaults(rectangularMixinDefaults, rectangleDefaults)

  // vgg-symbol
  defaults['vgg-symbol'] = extractDefaults(Symbol)

  // vgg-trail
  let trailDefaults = extractDefaults(Trail)
  defaults['vgg-trail'] = mergeDefaults(pathMixinDefaults, trailDefaults)
}

function extractDefaults (component) {
  let defaults = {}
  let props = component.props

  for (let propName in props) {
    let prop = props[propName]

    if (prop.hasOwnProperty('default') && prop.default !== undefined) {
      defaults[propName] = prop.default
    }
  }

  return defaults
}

function mergeDefaults (mixin, component) {
  return Object.assign(JSON.parse(JSON.stringify(mixin)), component)
}

extractAllDefaults()

export default defaults
