export default function (domain) {
  let newDomain = JSON.parse(JSON.stringify(domain))
  if (newDomain[0] > 0) {
    newDomain[0] = 0
  }
  return newDomain
}
