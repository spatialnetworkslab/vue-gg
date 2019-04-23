import { renderSVG as renderLabelSVG } from '../../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../../rendering/trail.js'

import componentPropDefaults from './componentPropDefaults.js'

export function createRenderOptions (tag, slotEntry) {
  let props = generateProps(tag, slotEntry.componentOptions.propsData)
  let interpolate
  let addToSpatialIndex = createIndexFunction(tag)
  let pathType

  return { props, interpolate, addToSpatialIndex, pathType }
}

function generateProps (tag, props) {
  let defaults = componentPropDefaults[tag]
  let newDefaults = Object.assign({}, defaults)
  return Object.assign(newDefaults, props)
}

function createIndexFunction (tag) {
  // TODO
  return coords => coords
}

export function renderMark (tag, createElement, renderContext, renderOptions) {
  let renderFunc = renderFuncLookup[tag]
  return renderFunc(createElement, renderContext, renderOptions)
}

const renderFuncLookup = {
  'vgg-area': renderPathSVG,
  'vgg-label': renderLabelSVG,
  'vgg-line': renderLineSVG,
  'vgg-multi-line': renderPathSVG,
  'vgg-path': renderPathSVG,
  'vgg-point': renderPointSVG,
  'vgg-polygon': renderPathSVG,
  'vgg-rectangle': renderRectangleSVG,
  'vgg-symbol': renderSymbolSVG,
  'vgg-trail': renderTrailSVG
}

function extractDefaults (propsDefinition) {
  for (let propName in propsDefinition) {

  }
}
