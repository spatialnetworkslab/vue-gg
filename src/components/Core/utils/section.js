export function calculateWidths (slots, coordinateSpecification) {
  let widths = { top: 0, bottom: 0, left: 0, right: 0 }

  let xRange = coordinateSpecification.x2 - coordinateSpecification.x1
  let yRange = coordinateSpecification.y2 - coordinateSpecification.y1

  for (let side in widths) {
    if (slots.hasOwnProperty(side)) {
      let slotContent = slots[side]()
      let axis = extractAxis(slotContent, side)
      let propsData = axis.componentOptions.propsData

      switch (side) {
        case 'bottom':
          widths.bottom = propsData.h || Math.abs(yRange) / 8
          break
        case 'top':
          widths.top = propsData.h || Math.abs(yRange) / 8
          break
        case 'left':
          widths.left = propsData.w || Math.abs(xRange) / 8
          break
        case 'right':
          widths.right = propsData.w || Math.abs(xRange) / 8
      }
    }
  }

  return widths
}

export function createAxisProps (slots, side, coordinateSpecification, widths, scales) {
  if (!slots.hasOwnProperty(side)) { return {} }

  let slotContent = slots[side]()
  let axis = extractAxis(slotContent, side)

  let x1, x2, y1, y2, scale

  if (side === 'bottom') {
    x1 = coordinateSpecification.x1 + widths.left
    x2 = coordinateSpecification.x2 - widths.right
    y1 = coordinateSpecification.y1
    y2 = y1 + widths.bottom
    scale = scales.x
  }

  if (side === 'top') {
    x1 = coordinateSpecification.x1 + widths.left
    x2 = coordinateSpecification.x2 - widths.right
    y1 = coordinateSpecification.y2 - widths.top
    y2 = coordinateSpecification.y2
    scale = scales.x
  }

  if (side === 'left') {
    x1 = coordinateSpecification.x1
    x2 = x1 + widths.left
    y1 = coordinateSpecification.y1 + widths.bottom
    y2 = coordinateSpecification.y2 - widths.top
    scale = scales.y
  }

  if (side === 'right') {
    x1 = coordinateSpecification.x2 - widths.right
    x2 = coordinateSpecification.x2
    y1 = coordinateSpecification.y1 + widths.bottom
    y2 = coordinateSpecification.y2 - widths.top
    scale = scales.y
  }

  let newProps = { x1, x2, y1, y2, scale }
  let propsData = axis.componentOptions.propsData

  let mergedPropsData = updatePropsData(propsData, newProps)

  return mergedPropsData
}

function extractAxis (slotContent, side) {
  let axis = slotContent[0]
  let allowedAxis = ['bottom', 'top'].includes(side) ? 'vgg-x-axis' : 'vgg-y-axis'

  if (slotContent.length === 1 && axis.componentOptions.tag === allowedAxis) {
    return axis
  } else {
    throw new Error(`'${side}' slot of 'vgg-section' can only contain a '${allowedAxis}'`)
  }
}

function updatePropsData (propsData, newProps) {
  for (let prop in newProps) {
    propsData[prop] = propsData[prop] || newProps[prop]
  }
  return propsData
}
