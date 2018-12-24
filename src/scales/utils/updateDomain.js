export default function (domain, { scale, fromZero, updateDomain }) {
  let newDomain = JSON.parse(JSON.stringify(domain))

  if (updateDomain) {
    if (updateDomain.constructor !== Array && updateDomain.length !== 2) {
      throw new Error('Invalid domain modification')
    }

    if (is(updateDomain[0])) { newDomain[0] = updateDomain[0] }
    if (is(updateDomain[1])) { newDomain[1] = updateDomain[1] }
  }

  if (!updateDomain && fromZero !== false) {
    if (newDomain[0] > 0) { newDomain[0] = 0 }
  }

  return newDomain
}

function is (val) {
  return val !== undefined && val !== null
}
