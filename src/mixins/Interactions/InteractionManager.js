import rbush from 'rbush'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        nativeListeners: {},
        spatialIndex: rbush(),
        collisionTests: {}
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
    addElement (type, bbox, instance, listeners) {
      this.indexElement(type, bbox, instance)

      for (let listener of listeners) {
        this.startListener(listener)
      }
    },

    indexElement (type, bbox, instance) {
      let item = { instance, ...bbox }

      switch (type) {
        case 'point':
          this.interactionManager.spatialIndex.insert(item)
          break
        case 'line':
          // TODO
          break
      }
    },

    startListener (customListener) {
      if (customListener === 'click') {
        this.startClickListener(customListener)
      }
    },

    startClickListener (customListener) {
      if (!this.interactionManager.nativeListeners.hasOwnProperty('click')) {
        this.interactionManager.nativeListeners.click = true
        this.interactionManager.collisionTests.click = {}

        this.$el.addEventListener('click', e => this.handleListener(customListener, e))
      }
    },

    handleListener (customListener, e) {
      let { x, y } = getCoords(this.svg, this.svgPoint, e)
      let hits = this.interactionManager.spatialIndex.search({
        minX: x, minY: y, maxX: x, maxY: y
      })

      for (let hit of hits) {
        hit.instance.$emit(customListener, e)
      }
      // let collisionTests = this.interactionManager.collisionTests[listener]
      // for (let test in collisionTests) {
      //
      // }
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
