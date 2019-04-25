import { renderSVG as renderLabelSVG } from '../../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../../rendering/trail.js'

import Section from '../Section.vue'

import componentPropDefaults from './componentPropDefaults.js'
import componentInterpolateDefaults from './componentInterpolateDefaults.js'

export function createRenderOptions (slotEntry, interpolationNecessary, interactionManager, uuid, sectionParentChain) {
  if (!slotEntry) return

  let tag = slotEntry.componentOptions.tag

  let props = generateProps(tag, slotEntry.componentOptions.propsData)

  let interpolate = generateInterpolate(
    tag, slotEntry.componentOptions.propsData.interpolate, interpolationNecessary
  )

  let listeners = slotEntry.componentOptions.listeners
  let events = parseEvents(listeners)

  let addToSpatialIndex = createIndexFunction(
    tag, interactionManager, props, events, uuid, sectionParentChain
  )

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

function createIndexFunction (tag, interactionManager, props, events, uuid, sectionParentChain) {
  let markType = indexArgLookup[tag]
  return coords => {
    if (events) {
      interactionManager.addItem(uuid, markType, coords, props, events, sectionParentChain)
    }
  }
}

function parseEvents (listeners) {
  if (!listeners) { return undefined }

  const allowedEvents = ['click', 'hover', 'mouseover', 'mouseout', 'select', 'deselect']

  let events = {}
  let moreThanZeroAllowedEvents = false

  for (let event of allowedEvents) {
    if (listeners.hasOwnProperty(event)) {
      events[event] = listeners[event]
      moreThanZeroAllowedEvents = true
    }
  }

  return moreThanZeroAllowedEvents ? events : undefined
}

function getPathType (tag) {
  return pathTypeLookup[tag]
}

export function renderMark (tag, createElement, renderContext, renderOptions, mappedContent) {
  if (!renderOptions) return
  let renderFunc = renderFuncLookup[tag]
  return renderFunc(createElement, renderContext, renderOptions, mappedContent)
}

function renderSection (createElement, renderContext, renderOptions, mappedContent) {
  return createElement(Section, { props: renderOptions.props }, mappedContent.componentOptions.children)
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
  'vgg-trail': renderTrailSVG,

  'vgg-section': renderSection
}

const pathTypeLookup = {
  'vgg-area': 'area',
  'vgg-multi-line': 'multiline',
  'vgg-path': 'path',
  'vgg-polygon': 'polygon',
  'vgg-trail': 'trail'
}

const indexArgLookup = {
  'vgg-area': 'area',
  'vgg-label': undefined,
  'vgg-line': 'line',
  'vgg-multi-line': 'multiline',
  'vgg-path': 'path',
  'vgg-point': 'point',
  'vgg-polygon': 'polygon',
  'vgg-rectangle': 'rectangle',
  'vgg-symbol': 'symbol',
  'vgg-trail': 'trail'
}
