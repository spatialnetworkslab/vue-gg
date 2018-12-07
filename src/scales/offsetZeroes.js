export default function (func) {
  return input => {
    if (input === 0) { input = 1e6 }
    return func(input)
  }
}
