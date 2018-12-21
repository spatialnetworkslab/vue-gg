export default function (prop, dimension, parentBranch) {
  if (dimension === 'x') { return parentBranch.scaleX(prop) }
  if (dimension === 'y') { return parentBranch.scaleY(prop) }
}
