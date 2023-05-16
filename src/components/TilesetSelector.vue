<template>
	<div class="tileset">
		<img v-for="tileset in choices" class="pointer" :class="{selected: tileset === currentTileset}" @click.left="currentTileset = tileset" :alt="tileset" :src="`https://s.rsg.sc/sc/images/games/GTAV/map/${tileset}/5/9/15.jpg`"/>
		<input type="text" v-model="currentTileset"/>
	</div>
</template>


<script>
export default {
	name: "TilesetSelector",
	props: {
		choices: Array
	},
	inject: ["currentTileset"]
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

.tileset img.selected {
	outline: white solid 2px;
}
</style>