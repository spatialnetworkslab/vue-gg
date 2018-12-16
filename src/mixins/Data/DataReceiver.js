export default {
  inject: ['$$dataContainerContext'],

  computed: {
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    }
  }
}
