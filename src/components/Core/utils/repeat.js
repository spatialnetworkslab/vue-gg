import { updateSection } from './grid.js'

export function repeatSections (createElement, slot, layout, xValues, yValues) {
  let newSections = []

  for (let rowIndex = 0; rowIndex < yValues.length; rowIndex++) {
    let y = yValues[rowIndex]
    for (let colIndex = 0; colIndex < xValues.length; colIndex++) {
      let x = xValues[colIndex]
      let slotContent = slot({ x, y })
      let sections = validateSlotContent(slotContent)

      let layoutIndex = (rowIndex * xValues.length) + colIndex
      let currentLayout = layout[layoutIndex]

      let updatedSections = sections.map(section => {
        return updateSection(createElement, section, currentLayout)
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
