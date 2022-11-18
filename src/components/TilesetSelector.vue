<template>
	<div class="tileset">
		<img v-for="tileset in options" class="pointer" :src="`https://s.rsg.sc/sc/images/games/GTAV/map/${tileset}/5/9/15.jpg`" @click.left="onselect(tileset)" :alt="tileset"/>
	</div>
</template>


<script>
export default {
	name: "TilesetSelector",
	props: {
		onselect: {
			type: Function,
			default() {}
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
}
</style>