export default function (intervals) {
  let ticks = new Set()
  for (let interval of intervals) {
    ticks.add(interval[0])
    ticks.add(interval[1])
  }
  return Array.from(ticks)
}
