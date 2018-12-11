export default function (domain) {
  let newDomain = JSON.parse(JSON.stringify(domain))
  newDomain[0] = 1e-6

  return newDomain
}
