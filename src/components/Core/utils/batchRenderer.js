import { renderSVG as renderLabelSVG } from '../../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../../rendering/trail.js'

import componentPropDefaults from './componentPropDefaults.js'
import componentInterpolateDefaults from './componentInterpolateDefaults.js'

export function createRenderOptions (slotEntry, interpolationNecessary) {
  if (!slotEntry) return
  let tag = slotEntry.componentOptions.tag
  let props = generateProps(tag, slotEntry.componentOptions.propsData)
  let interpolate = generateInterpolate(tag, slotEntry.componentOptions.propsData.interpolate, interpolationNecessary)
  let addToSpatialIndex = createIndexFunction(tag)
  let pathType = getPathType(tag)

  return { props, interpolate, addToSpatialIndex, pathType }
}

function generateProps (tag, props) {
  let defaults = componentPropDefaults[tag]
  let newDefaults = Object.assign({}, defaults)
  return Object.assign(newDefaults, props)
}

function generateInterpolate (tag, interpolateProp, interpolationNecessary) {
  let getInterpolate = componentInterpolateDefaults[tag]
  return getInterpolate(interpolateProp, interpolationNecessary)
}

function createIndexFunction (tag) {
  // TODO
  return coords => coords
}

function getPathType (tag) {
  return pathTypeLookup[tag]
}

export function renderMark (tag, createElement, renderContext, renderOptions) {
  if (!renderOptions) return
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

const pathTypeLookup = {
  'vgg-area': 'area',
  'vgg-multi-line': 'multiline',
  'vgg-path': 'path',
  'vgg-polygon': 'polygon',
  'vgg-trail': 'trail'
}
