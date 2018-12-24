export default function (domain, scalingOptions) {
  let newDomain = JSON.parse(JSON.stringify(domain))
  let updateDomain = scalingOptions.domain

  if (updateDomain) {
    if (updateDomain.constructor !== Array && updateDomain.length !== 2) {
      throw new Error('Invalid domain modification')
    }

    if (is(updateDomain[0])) { newDomain[0] = updateDomain[0] }
    if (is(updateDomain[1])) { newDomain[1] = updateDomain[1] }
  }

  return newDomain
}

function is (val) {
  return val !== undefined && val !== null
}
