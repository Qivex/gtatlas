<template>
	<div :id="id" class="gtamap" :class="`tileset-${tileset}`"></div>
</template>


<script>
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import maplayers from "../data/maplayers.js"

export default {
	name: "GTAMap",
	props: {
		id: String
	},
	data() {
		return {
			map: undefined,
			tilelayer: undefined,
			layers: {},
			tileset: "render"
		}
	},
	methods: {
		setupGTAMap: function() {
			// Define map functionality
			this.map = Leaflet.map(this.id, {
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
			})
			// Available tiles
			this.tilelayer = Leaflet.tileLayer("https://s.rsg.sc/sc/images/games/GTAV/map/render/{z}/{x}/{y}.jpg", {
				maxNativeZoom: 7,
				minNativeZoom: 0,
				bounds: [
					[0,0],
					[-192,128]
				],
				keepBuffer: 3
			}).addTo(this.map)
			this.initViewState()
			this.initIconState()
		},
		initViewState() {
			// URL query
			let usp = new URLSearchParams(window.location.search)
			let lat = parseFloat(usp.get("x"))
			let lng = parseFloat(usp.get("y"))
			let zoom = parseInt(usp.get("zoom"))
			// localStorage
			let ls = window.localStorage
			lat ||= ls.getItem("map-lat")
			lng ||= ls.getItem("map-lng")
			zoom ||= ls.getItem("map-zoom")
			// Defaults
			lat ||= -140
			lng ||= 64
			zoom ||= 3
			// Set view
			this.map.setView([lat,lng], zoom, {animate: false})
		},
		initIconState() {
			// Load all maplayers
			this.layers = maplayers	// Is this even needed? Maybe for update detection?
			// URL query
			let usp = new URLSearchParams(window.location.search)
			let encodedIconState = usp.get("hide")
			switch (encodedIconState) {	// Todo: Currently this doesnt affect the Filter -> out of sync
				case "all":  // Don't show any icons
					return
				case "none": // Show all icon layers
					for (let layerID in this.layers) {	// Cant use forEach because Object, not Array
						let layer = this.layers[layerID]
						layer.addTo(this.map)
					}
					break
				default:     // Decode desired state

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
		updateIconSize(size) {
			// Update all currently rendered icons
			document.querySelectorAll(".leaflet-div-icon").forEach(divIcon => {
				let s = divIcon.style
				s.width = s.height = size + "px"
				s.marginTop = s.marginLeft = -size / 2 + "px"
			})
			// Update the hidden icons
			for (let id in this.layers) {
				let group = this.layers[id]
				group.eachLayer(l => {
					if (l instanceof Leaflet.Marker) {
						let i = l.getIcon()
						i.options.iconSize = [size, size]
						l.setIcon(i)
					}
				})
			}
		},
		updateTileset(name) {
			// Update tile source
			this.tilelayer.setUrl(`https://s.rsg.sc/sc/images/games/GTAV/map/${name}/{z}/{x}/{y}.jpg`)
			// Update class (used for background styling)
			this.tileset = name
		},
		updateBusinessColor(color) {
			// Check if input is valid color
			if (!CSS.supports("color", color)) return
			// Update CSS variable (https://css-tricks.com/updating-a-css-variable-with-javascript)
			document.documentElement.style.setProperty("--business-color", color)
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
}

/* Map background color depends on tileset */
.tileset-render {
	background-color: #0D2B4F;
}

.tileset-print {
	background-color: #4EB2D0;
}

.tileset-game {
	background-color: #384950;
}

/* Leaflet tile layers use *some* high z-index, but aside elements must be on top */
aside {
	z-index: 500;
}

/* Define initial business color for icons because SVG defaults to black */
:root {
	--business-color: #F0F0F0;
}

/* Leaflet's divIcon doesn't have transparent background by default */
.leaflet-div-icon {
	background: none;
	border: none;
}

/* Enable resizing */
.leaflet-div-icon > svg {
	width: 100%;
	height: 100%;
}
</style>