import CoordinateSystemManager from './CoordinateSystemManager.js'

export default {
  data () {
    return {
      ready: false,
      coordinateSystem: new CoordinateSystemManager()
    }
  },

  mounted () {
    this.initCoordinateSystemManager()
    this.ready = true
  },

  methods: {
    initCoordinateSystemManager () {
      let system = 'cartesian'

      let ranges = {
        x: [0, this.width],
        y: [this.height, 0]
      }

      let domains = {
        x: [0, this.width],
        y: [0, this.height]
      }

      let transform = ([x, y]) => [x, this.height - y]

      let coordinateSystem = {
        system,
        domains,
        ranges,
        transform
      }

      this.coordinateSystem.setRoot(coordinateSystem)
    }
  },

  provide () {
    let $$context = this
    let $coordinateSystemParent = 'root'

    return { $$context, $coordinateSystemParent }
  }
}
