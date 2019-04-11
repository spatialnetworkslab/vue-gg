import { updateComponent } from './grid.js'
import isSquareComponent from './isSquareComponent.js'

export function repeatComponents (slot, layout, xValues, yValues, sides) {
  let newComponents = []

  let rowLength = yValues.length
  let colLength = xValues.length

  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    let y = yValues[rowIndex]
    for (let colIndex = 0; colIndex < colLength; colIndex++) {
      let x = xValues[colIndex]

      let slotContent = slot({ x, y })
      let components = validateSlotContent(slotContent)

      let layoutIndex = (rowIndex * colLength) + colIndex
      let currentLayout = layout[layoutIndex]

      let updatedComponents = components.map(section => {
        return updateComponent(section, currentLayout)
      })

      let currentSides = getSides(rowIndex, colIndex, rowLength, colLength)

      updatedComponents = updatedComponents.map(section => {
        return hideSectionAxes(section, currentSides, sides)
      })

      newComponents.push(...updatedComponents)
    }
  }

  return newComponents
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
  if (definedElements.some(c => !isSquareComponent(c))) {
    throw new Error(`vgg-repeat can only contain 'square' components`)
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
