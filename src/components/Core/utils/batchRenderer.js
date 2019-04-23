import { renderSVG as renderLabelSVG } from '../../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../../rendering/trial.js'

export function createRenderOptions (tag, slotEntry) {
  let props = slotEntry.componentOptions.propsData
  let interpolate
  let addToSpatialIndex = createIndexFunction(tag)
  let pathType

  return { props, interpolate, addToSpatialIndex, pathType }
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
