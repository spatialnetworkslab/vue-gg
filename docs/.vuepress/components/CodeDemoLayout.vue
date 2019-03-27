<template>

	<div v-if="rightWidth" class="group">
		<slot></slot>
	</div>

	<div v-else class="sequential">
	    <slot></slot>
	</div>

</template>

<script>
export default {

	data () {
	    return {
	    	rightWidth: undefined
	    }
	},

	mounted () {
	    if (window.innerWidth > 1000) {
	      this.rightWidth = true
	    } else {
	      this.rightWidth = false
	    }
	    window.addEventListener('resize', this.handleAsideResize)
    },

    methods: {
		handleAsideResize () {
			if (window.innerWidth > 1000) {
				this.rightWidth = true
			} else {
				this.rightWidth = false
			}
		}
	}
}
</script>

<style scoped>

.group {
	display: flex;
	justify-content: space-around;
	align-items: center
}

.sequential {
	display: flex;
	flex-direction: column;
	align-items: center
}

</style>