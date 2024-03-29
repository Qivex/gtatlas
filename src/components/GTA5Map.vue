<template>
	<LeafletMap ref="leafletmap" class="gta5map" v-bind="leafletOptions"/>
</template>


<script>
import LeafletMap from "./LeafletMap.vue"

import Leaflet from "leaflet"

import mapdata from "../data/mapdata.json"

function constructMapLayers(data, ts) {
	let result = {}
	data.layers.forEach((layer, index) => {
		// Decide which builder to use
		let builder
		switch (layer.id) {
			case "test1":	// Atomic icons
				builder = p => ts.marker(p, "ammunation")	// More generic: layer.id or layer.icon as iconname!
				break
			case "test2":	// Grouped icons
				builder = p => ts.group([
					ts.marker(p[0], "supplies-crate"),
					ts.marker(p[1], "warehouse-crates"),
					ts.line([p[0], p[1]]),
					ts.circle(p[0], 128, "#F0C850", 0.5)
				])
				break
			case "test3":	// Stress test
				builder = p => {
					let distance = p[0]
					let topleft = p[1]
					let bottomright = p[2]
					let markers = []
					for (let x = topleft[0]; x < bottomright[0]; x += distance) {
						for (let y = topleft[1]; y < bottomright[1]; y += distance) {
							markers.push(ts.marker([x,y], "mc-meth"))
						}
					}
					return ts.group(markers)
				}
		}
		// Apply the builder-function to all layer components and group them
		result[layer.id] = ts.group(layer.data.map(builder))
	})
	return result
}

export default {
	name: "GTA5Map",
	components: {
		LeafletMap
	},
	inject: ["getConfigValue", "persistOnClose", "currentTileset", "currentIconSize", "currentBusinessColor"],
	computed: {
		map() {
			// Shortcut to internal map
			return this.$refs.leafletmap
		}
	},
	data() {
		return {
			leafletOptions: {
				id: "gta5map",
				tileUrlTemplate: "https://s.rsg.sc/sc/images/games/GTAV/map/{tileset}/{z}/{x}/{y}.jpg",
				initialTileset: this.currentTileset,
				initialIconSize: this.currentIconSize,
				initialIconColor: this.currentBusinessColor,
				mapOptions: {
					// No distortion or wrapping
					crs: Leaflet.CRS.Simple,
					// No default controls
					attributionControl: false,
					zoomControl: false,
					// Limit navigation
					maxBounds: [	// margins: 64v & 128h
						[64,-128],
						[-256,256]
					],
					maxZoom: 8,
					minZoom: 2
				},
				tileOptions: {
					// Available tiles
					maxNativeZoom: 7,
					minNativeZoom: 0,
					bounds: [
						[0,0],
						[-192,128]
					],
					// Better panning behaviour
					keepBuffer: 3,
					updateWhenIdle: false
				},
			}
		}
	},
	mounted() {
		// Construct all maplayers from data using tools
		let maplayers = constructMapLayers(mapdata, this.map.getToolset())
		// Provide constructed layers
		this.map.addLayers(maplayers)
		// Get initial state
		let lat = parseFloat(this.getConfigValue("x", "map-lat", -140))
		let lng = parseFloat(this.getConfigValue("y", "map-lng", 64))
		let zoom = parseInt(this.getConfigValue("zoom", "map-zoom", 3))
		// Apply map state
		this.map.instance.setView([lat,lng], zoom, {animate: false})
		// Store map state on leave
		this.persistOnClose("map-lat", () => this.map.instance.getCenter().lat)
		this.persistOnClose("map-lng", () => this.map.instance.getCenter().lng)
		this.persistOnClose("map-zoom", () => this.map.instance.getZoom())
	}
}
</script>


<style>
.gta5map {
	height: 100%;
	z-index: 0;
}

/* Map background color depends on tileset */
.gta5map.tileset-render {
	background-color: #0D2B4F;
}

.gta5map.tileset-print {
	background-color: #4EB2D0;
}

.gta5map.tileset-game {
	background-color: #384950;
}
</style>