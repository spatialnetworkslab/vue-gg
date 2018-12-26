export default function (prop) {
  if (!this.$$map) {
    return prop
  }

  if (this.$$map) {
    return { assign: prop }
  }
}
