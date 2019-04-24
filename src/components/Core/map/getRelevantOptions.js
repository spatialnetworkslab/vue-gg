export default function (slotContent) {
  let options = []
  slotContent.forEach(element => {
    if (element && element.tag !== undefined) {
      let relevantStuff = getRelevantStuff(element)
      options.push(relevantStuff)
    } else {
      options.push(null)
    }
  })

  return options
}

function getRelevantStuff (element) {
  let { listeners, propsData: props, children, tag } = element.componentOptions

  return { listeners, props, children, tag }
}
