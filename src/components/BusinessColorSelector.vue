<template>
	<div class="businesscolor">
		<div v-for="color in colors" :style="`background-color:${color}`" @click.left="onselect(color)"/>
	</div>
</template>


<script>
export default {
	name: "BusinessColorSelector",
	props: {
		onselect: {
			type: Function,
			default() {}
		},
		colors: Array
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
	cursor: pointer;
}
</style>