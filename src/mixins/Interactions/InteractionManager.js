import rbush from 'rbush'
import collisionTest from './utils/collisionTest.js'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        nativeListeners: {}, // keys: native listeners (click, mouseover, etc)
        spatialIndex: rbush()
      })
    }
  },

  computed: {
    svg () {
      return this.$el
    },

    svgPoint () {
      return this.svg.createSVGPoint()
    }
  },

  methods: {
    addElement (type, coordinates, instance, listeners) {
      this.indexElement(type, coordinates, instance)

      for (let listener of listeners) {
        this.startListener(listener)
      }
    },

    indexElement (type, coordinates, instance) {
      let item

      if (type === 'point') {
        let radius = instance.radius

        let minX = coordinates[0] - radius
        let maxX = coordinates[0] + radius
        let minY = coordinates[1] - radius
        let maxY = coordinates[1] + radius

        let geometry = {
          x: coordinates[0],
          y: coordinates[1],
          radius,
          type
        }

        item = { geometry, instance, minX, maxX, minY, maxY }
      }

      if (type === 'line') {
        // TODO
      }

      if (type === 'polygon') {
        // TODO
      }

      this.interactionManager.spatialIndex.insert(item)
    },

    startListener (customListener) {
      if (customListener === 'click') {
        this.startClickListener(customListener)
      }
    },

    startClickListener (customListener) {
      if (!this.interactionManager.nativeListeners.click) {
        this.interactionManager.nativeListeners.click = true
        this.svg.addEventListener('click', e => this.handleListener(customListener, e))
      }
    },

    handleListener (customListener, e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let hits = collisionTest(coords, this.interactionManager.spatialIndex)

      for (let hit of hits) {
        hit.instance.$emit(customListener, e)
      }
    }
  },

  provide () {
    let $$interactionManager = this
    return { $$interactionManager }
  }
}

// https://stackoverflow.com/a/42711775/10573487
function getCoords (svg, svgPoint, { clientX, clientY }) {
  svgPoint.x = clientX
  svgPoint.y = clientY

  return svgPoint.matrixTransform(svg.getScreenCTM().inverse())
}
