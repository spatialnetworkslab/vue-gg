import * as d3 from 'd3'

export default class Transformation {
  constructor (options) {
    // For every type other than 'custom', we will expect two more option keys:
    //   - domains
    //   - ranges
    // Both of these will be objects with x and y keys
    // Behind each of these keys will be an array of length two. For example:
    //
    // {
    //   type: 'stretch',
    //   domains: {
    //     x: [-100, 100],
    //     y: [-200, 200]
    //   },
    //   ranges: {
    //     x: [0, 500],
    //     y: [0, 500]
    //   }
    // }
    //
    // 'domains' refers to the values of the marks inside of the transformation,
    // while 'ranges' refers to the portion of the parent coordinate space that
    // the values of the marks will be mapped to.

    if (options.type === 'linear') {
      this.transform = ([x, y]) => {
        let domainX = options.domains.x
        let domainY = options.domains.y
        let rangeX = options.ranges.x
        let rangeY = options.ranges.y

        let scaleX = d3.scaleLinear().domain(domainX).range(rangeX)
        let scaleY = d3.scaleLinear().domain(domainY).range(rangeY)

        return [scaleX(x), scaleY(y)]
      }
    }

    if (options.type === 'polar') {
      // TODO
    }

    if (options.type === 'custom') {
      this.transform = options.tranform
    }
  }
}
