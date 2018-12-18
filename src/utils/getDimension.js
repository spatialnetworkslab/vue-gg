export default function (prop) {
  if (['x', 'x1', 'x2', 'w'].includes(prop)) { return 'x' }
  if (['y', 'y1', 'y2', 'h'].includes(prop)) { return 'y' }
}
