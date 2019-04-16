import createSVGStyle from './utils/createSVGStyle.js'

export function renderSVG (createElement, { $$transform }, { props, addToSpatialIndex }) {
  if (props.shape === 'circle') {
    return createCircle(createElement, $$transform, props, addToSpatialIndex)
  } else if (props.shape === 'square') {
    return createSquare(createElement, $$transform, props, addToSpatialIndex)
  } else if (pathAlias.hasOwnProperty(props.shape)) {
    let path = pathAlias[props.shape]
    return createPath(createElement, $$transform, props, path, addToSpatialIndex)
  } else {
    return createPath(createElement, $$transform, props, props.shape, addToSpatialIndex)
  }
}

//
// HELPERS
//

function createCircle (createElement, $$transform, props, addToSpatialIndex) {
  let [cx, cy] = $$transform([props.x, props.y])
  let r = props.size / 2

  addToSpatialIndex([cx, cy])

  return createElement('circle', {
    attrs: {
      'cx': cx,
      'cy': cy,
      'r': r
    },
    style: createSVGStyle(props)
  })
}

function createSquare (createElement, $$transform, props, addToSpatialIndex) {
  let [cx, cy] = $$transform([props.x, props.y])

  let l = props.size
  let x = cx - (l / 2)
  let y = cy - (l / 2)

  addToSpatialIndex([x, y])

  return createElement('rect', {
    attrs: {
      'width': l,
      'height': l,
      'x': x,
      'y': y
    },
    style: createSVGStyle(props)
  })
}

function createPath (createElement, $$transform, props, d, addToSpatialIndex) {
  let [cx, cy] = $$transform([props.x, props.y])

  addToSpatialIndex([cx, cy])

  let s = createSVGStyle(props)
  let scale = props.size / 2
  s.strokeWidth = s.strokeWidth / scale
  s.transform = 'translateX(' + cx + 'px) translateY(' + cy + 'px) scale(' + scale + ', ' + scale + ') '

  return createElement('path', {
    attrs: {
      d
    },
    style: s
  })
}

const pathAlias = {
  'cross': 'M-.5,-1L.5,-1L.5,-.5L1,-.5L1,.5L.5,.5L.5,1L-.5,1L-.5,.5L-1,.5L-1,-.5L-.5,-.5L-.5,-1Z',
  'cross-sharp': 'M0,-1L.2,-.2L1,0L.2,.2L0,1L-.2,.2L-1,0L-.2,-.2Z',

  'diamond': 'M0,-1L1,0L0,1L-1,0L0,-1Z',

  'triangle-up': 'M0,-1L1,1L-1,1L0,-1Z',
  'triangle-down': 'M1,-1L0,1L-1,-1L1,-1Z',
  'triangle-right': 'M-1,-1L1,0L-1,1L-1,-1Z',
  'triangle-left': 'M1,-1L-1,0L1,1L1,-1Z',

  'star4': 'M0,.71L1,1L.71,0L1,-1L0,-.71L-1,-1L-.71,0L-1,1L0,.71Z',
  'star5': 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z',
  'star': 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z',
  'star6': 'M0,.58L.5,1L.43,.29L1,0L.43,-.29L.5,-1L0,-.58L-.5,-1L-.43,-.29L-1,0L-.43,.29L-.5,1Z',
  'star8': 'M0.0,0.54L0.41,1.0L0.38,0.38L1.0,0.41L0.54,0.0L1.0,-0.41L0.38,-0.38L0.41,-1.0L0.0,-0.54L-0.41,-1.0L-0.38,-0.38L-1.0,-0.41L-0.54,0.0L-1.0,0.41L-0.38,0.38L-0.41,1.0Z',

  'pentagon': 'M-1,-.24L-0,-1L1,-.24L.62,1L-.62,1L-1,-.24Z',
  'hexagon': 'M-1,0L-.57,-1L.57,-1L1,0L.57,1L-.57,1L-1,0Z',
  'heptagon': 'M-1,.29L-.8,-.6L-0,-1L.8,-.6L1,.29L.45,1L-.45,1L-1,.29Z',
  'septagon': 'M-1,.29L-.8,-.6L-0,-1L.8,-.6L1,.29L.45,1L-.45,1L-1,.29Z',
  'octagon': 'M-1,-.41L-.41,-1L.41,-1L1,-.41L1,.41L.41,1L-.41,1L-1,.41L-1,-.41Z',
  'nonagon': 'M.35,-1L.88,-.55L1,.15L.65,.76L0,1L-.65,.76L-1,.15L-.88,-.55L-.35,-1L.35,-1Z',
  'decagon': 'M-1,0L-.81,-.62L-.31,-1L.31,-1L.81,-.62L1,0L.81,.62L.31,1L-.31,1L-.81,.62L-1,0Z'
}
