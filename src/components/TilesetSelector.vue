<template>
	<div class="tileset">
		<img v-for="tileset in options" :src="`tiles/${tileset}/5_17_22.jpg`" @click.left="onselect(tileset)" :alt="tileset"/>
	</div>
</template>


<script>
export default {
	name: "TilesetSelector",
	props: {
		onselect: {
			type: Function,
			default: function() {}
		},
		options: Array
	}
}
</script>


<style>
.tileset {
	display: grid;
	grid-template-columns: repeat(auto-fit, 3rem);	/* grid-auto-flow: column */
	column-gap: 1rem;
}

.tileset img {
	width: 3rem;
	cursor: pointer;
}
</style>