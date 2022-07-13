<template>
	<GTAMap ref="map" id="gtamap"/>
	<LayerSelect :map="map"/>
	<MapSettings :map="map"/>
	<div id="mapicons"></div>
</template>


<script>
import GTAMap from "./components/GTAMap.vue"
import LayerSelect from "./components/LayerSelect.vue"
import MapSettings from "./components/MapSettings.vue"

export default {
	name: "App",
	components: {
		GTAMap,
		LayerSelect,
		MapSettings
	},
	data() {
		return {
			map: undefined	// Ref doesn't exist yet
		}
	},
	mounted() {
		// Update ref to map (for all components using it)
		this.map = this.$refs.map
	}
}


</script>


<style>
body {
	position: fixed; /* Fixes shifting viewport on mobile (https://stackoverflow.com/a/68359419) */
	height: 100%;
	width: 100%;
	margin: 0px;
	padding: 0px;
	color: #fff;	/* Initial org-color for icons (defaults to black) */
}

p {
	margin: 0px;
	color: #fff;
	font-family: arial;
}

/* SVG document with all icons as <symbol> */
#mapicons {
	display: none;
}
</style>