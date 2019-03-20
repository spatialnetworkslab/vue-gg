export default function (mark, validTypes, geometry) {
  if (!validTypes.includes(geometry.type)) {
    throw new Error(
      `Invalid geometry ${geometry.type}: 
      vgg-${mark} accepts only geometries of type ${validTypes.join(' or ')}`)
  }
}
