export default {
  inject: ['$$dataManager', '$$dataScope'],

  computed: {
    $$dataInterface () {
      return this.$$dataManager.createInterface(this.$$dataScope)
    }
  }
}
