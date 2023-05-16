<template>
	<div class="businesscolor">
		<div v-for="color in colors" class="pointer" :class="{selected: color === currentBusinessColor}" :style="`background-color:${color}`" @click.left="selectColor(color)"/>
	</div>
</template>


<script>
export default {
	name: "BusinessColorSelector",
	props: {
		colors: Array
	},
	inject: ["currentBusinessColor"],
	methods: {
		selectColor(color) {
			if (color === this.currentBusinessColor) {
				// Restore default when clicking same color again ("Leave organisation")
				this.currentBusinessColor = "#F0F0F0"
			} else {
				this.currentBusinessColor = color
			}
		}
	}
}
</script>


<style>
.businesscolor {
	display: grid;
	grid-template: repeat(2, 2rem) / repeat(5, 2rem);	/* grid-auto-flow: column */
	gap: 1rem;
}

.businesscolor div {
	border-radius: 1rem;
}
</style>