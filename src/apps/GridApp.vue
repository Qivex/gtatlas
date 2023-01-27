<template>
	<GTAMap id="gridmap"/>
</template>

<script>
import GTAMap from "../components/GTAMap.vue"
import Leaflet from "leaflet"

export default {
	name: "GridApp",
	components: {
		GTAMap
	},
	data() {
		return {
			map: undefined
		}
	},
	provide() {
		return {
			setMap: this.setMap
		}
	},
	methods: {
		setMap(map) {
			this.map = map
		}
	},
	mounted() {
		// Shortcut to Leaflet map (not component!)
		let m = this.map.map
		// Construct graticule
		let lines = []
		let step = 1/20
		for (let lat = 0; lat > -192; lat -= step) {
			lines.push([[lat,0],[lat,128]])  // Horizontal lines
		}
		for (let lng = 0; lng < 128; lng += step) {
			lines.push([[0,lng],[-192,lng]]) // Vertical lines
		}
		let graticule = Leaflet.polyline(lines, {color: "#FFF", weight: 0.5})
		// Current coordinate
		function showCoord(clickevent) {
			console.log(clickevent.latlng) // Todo: Overlay & quantization
		}
		// Only show both when zoomed in
		m.on("zoomend", e => {
			if (e.target.getZoom() > 7) {
				graticule.addTo(m)
				m.on("click", showCoord)
			} else {
				graticule.remove()
				m.off("click", showCoord)
			}
		})
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
}
</style>