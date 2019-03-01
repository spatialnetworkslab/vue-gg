import { updateSection } from './grid.js'

export function repeatSections (createElement, slot, layout, xValues, yValues, sides) {
  let newSections = []

  let rowLength = yValues.length
  let colLength = xValues.length

  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    let y = yValues[rowIndex]
    for (let colIndex = 0; colIndex < colLength; colIndex++) {
      let x = xValues[colIndex]

      let slotContent = slot({ x, y })
      let sections = validateSlotContent(slotContent)

      let layoutIndex = (rowIndex * colLength) + colIndex
      let currentLayout = layout[layoutIndex]

      let updatedSections = sections.map(section => {
        return updateSection(createElement, section, currentLayout)
      })

      let currentSides = getSides(rowIndex, colIndex, rowLength, colLength)

      updatedSections = updatedSections.map(section => {
        return hideSectionAxes(section, currentSides, sides)
      })

      newSections.push(...updatedSections)
    }
  }

  return newSections
}

export function calculateRowsCols (x, y) {
  let rows = x ? x.length : 1
  let cols = y ? y.length : 1
  return { rows, cols }
}

export function createAxesProps (axis, axisOptions, range, repeatVals) {
  if (['top', 'bottom'].includes(axis)) {

  }

  if (['left', 'right'].includes(axis)) {

  }
}

function validateSlotContent (slotContent) {
  let definedElements = slotContent.filter(c => c.tag !== undefined)
  if (definedElements.some(c => c.componentOptions.tag !== 'vgg-section')) {
    throw new Error(`vgg-repeat can only contain sections`)
  }
  return definedElements
}

function getSides (r, c, rLen, cLen) {
  let sides = {}
  sides.left = c === 0
  sides.right = c === cLen - 1
  sides.bottom = r === 0
  sides.top = r === rLen - 1
  return sides
}

function hideSectionAxes (section, currentSides, sides) {
  let axesProp = section.componentOptions.propsData.axes
  if (axesProp) {
    if (axesProp.constructor === Array) {
      let axesPropObj = {}
      for (let axis of axesProp) {
        axesPropObj[axis] = {}
      }
      axesProp = axesPropObj
    }

    for (let axis in axesProp) {
      if (!currentSides[axis] && sides.includes(axis)) {
        axesProp[axis].hide = true
      }
    }

    section.componentOptions.propsData.axes = axesProp
  }

  return section
}
