<template>

	<div v-if="rightWidth" class="codeSnippet" :style="`width: ${width}`">
		<slot></slot>
	</div>

	<div v-else style="width: 100%; margin-top: 25px">
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

	props: {
		width: {
			type: String,
			default: '50%'
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

.codeSnippet {
	max-height: 380px;
	overflow: scroll;
}

</style>