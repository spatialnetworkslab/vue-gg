export default {
  'vgg-area': defaultInterpolate,
  'vgg-label': defaultInterpolate,
  'vgg-line': defaultInterpolate,
  'vgg-multi-line': pathInterpolate,
  'vgg-path': pathInterpolate,
  'vgg-point': defaultInterpolate,
  'vgg-polygon': pathInterpolate,
  'vgg-rectangle': defaultInterpolate,
  'vgg-symbol': defaultInterpolate,
  'vgg-trail': pathInterpolate,

  'vgg-multi-point': () => false,

  'vgg-section': () => undefined
}

function defaultInterpolate (interpolate, interpolationNecessary) {
  if (interpolate !== undefined) { return interpolate }
  return interpolationNecessary
}

function pathInterpolate (interpolate, interpolationNecessary) {
  if (interpolate !== undefined) { return interpolate }
  return false
}
