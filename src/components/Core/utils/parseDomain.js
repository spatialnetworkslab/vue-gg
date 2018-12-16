export default function (domain, dataContainer) {
  let context

  if (dataContainer) {
    context = {
      domains: dataContainer.getDomains(),
      metadata: dataContainer.getMetadata()
    }
  }

  if (domain.constructor === Array) {
    return dataContainer ? domain : [0, 1]
  }

  if (domain.constructor === String) {
    return dataContainer ? context.domains[domain] : [0, 1]
  }

  if (domain.constructor === Object) {
    if (!domain.hasOwnProperty('variable')) {
      throw new Error(`Missing required key 'variable'`)
    }

    return dataContainer ? context.domains[domain.variable] : [0, 1]
  }

  if (domain.constructor === Function) {
    return dataContainer ? domain(context) : [0, 1]
  }
}
