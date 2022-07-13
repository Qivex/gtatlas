<template>
	<div :id="id" class="gtamap"></div>
</template>


<script>
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import { pixel2crs, crs2pixel, marker, line, circle } from "../maptools.js"
import * as mapLayerBuilders from "../data/maplayers.js"

export default {
	name: "GTAMap",
	props: {
		id: String
	},
	data() {
		return {
			map: undefined,
			tilelayer: undefined,
			layers: {}
		}
	},
	methods: {
		setupGTAMap: function() {
			// Map state & behaviour
			this.map = Leaflet.map(this.id, {
				// No earth curvature
				crs: Leaflet.CRS.Simple,
				// No default controls
				attributionControl: false,
				zoomControl: true,	// Temp: For testing on touchpad
				// Available navigation
				maxBounds: [	// margin: vertical 64, horizontal 128
					[64,-128],
					[-320,384]
				],
				maxZoom: 7,
				minZoom: 2,
				zoomSnap: 0.5,
				zoomDelta: 0.5,
				// Initial state
				center: [-200,128],
				zoom: 3
			})
			// Tile config
			this.tilelayer = Leaflet.tileLayer("tiles/{z}_{x}_{y}.jpg", {
				// Available tiles
				maxNativeZoom: 5,
				minNativeZoom: 1,
				bounds: [
					[0,0],
					[-256,256]
				],
				// No repetition
				noWrap: true
			}).addTo(this.map)
			// Initialize all layers
			for (let layerID in mapLayerBuilders) {
				console.log("Building layer " + layerID)
				// Construct the layer
				let builder = mapLayerBuilders[layerID]
				let layer = builder(Leaflet, marker, circle, line)
				// Keep ref to remove layer from map later
				this.layers[layerID] = layer
				// Add to map (TODO: depend on state)
				layer.addTo(this.map)
			}
		},
		setIconBusinessColor(colstring) {
			// Check if input is valid color
			if (!CSS.supports("color", colstring)) return
			// Update CSS variable (https://css-tricks.com/updating-a-css-variable-with-javascript)
			document.documentElement.style.setProperty("--business-color", colstring)
		},
		setLayerVisibility(id, visible) {
			//Shortcut
			let layer = this.layers[id]
			// Ignore unknown ids
			if (!layer) return
			// Adjust layer visibility (No error if not found by Leaflet)
			if (visible === true)
				this.map.addLayer(layer)
			else
				this.map.removeLayer(layer)
		},
		updateIconSize(newsize) {
			// TODO
			// Call all builders again with new icon size
			// Optional: Include method for that in each builder function?
		},
		changeTileset(name) {
			this.tilelayer.setUrl(`/tiles/${name}/{z}_{x}_{y}.jpg`)
		}
	},
	mounted: function() {
		this.setupGTAMap()
	}

}
</script>


<style>
.gtamap {
	height: 100%;
	background-color: #143D6B;
}

/* Leaflet tile layers use *some* high z-index, but aside elements must be on top */
aside {
	z-index: 500;
}

/* Define initial business color for icons because SVG defaults to black */
:root {
	--business-color: white;
}

/* Leaflets divIcon doesnt have transparent background by default */
.leaflet-div-icon {
	background: none;
	border: none;
}
</style>