<template>
	<div :id="id" class="gtamap" :class="`tileset-${tileset}`"></div>
</template>


<script>
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import {default as maplayers, version, name2index} from "../data/maplayers.js"

// Helper
function updateGroupIconSize(group, size) {
	group.eachLayer(layer => {
		if (layer instanceof Leaflet.Marker) {
			let icon = layer.getIcon()
			icon.options.iconSize = [size, size]
			layer.setIcon(icon)
		} else if (layer instanceof Leaflet.LayerGroup) {
			updateGroupIconSize(layer, size)	// Nested groups require recursion (eachLayer is flat)
		}
	})
}

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
			tileset: "render",
			initiallayers: undefined
		}
	},
	methods: {
		setupGTAMap() {
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
				keepBuffer: 3,
				updateWhenIdle: false
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
			// Save view whenever user leaves
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "hidden") {
					let center = this.map.getCenter()
					ls.setItem("map-lat", center.lat)
					ls.setItem("map-lng", center.lng)
					ls.setItem("map-zoom", this.map.getZoom())
				}
			})
		},
		initIconState() {
			// Load all maplayers
			this.layers = maplayers	// Is this even needed? Maybe for update detection?
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
			// Update the layer definitions
			for (let id in this.layers) {
				updateGroupIconSize(this.layers[id], size)
			}
			// Update all currently rendered icons
			document.querySelectorAll(".leaflet-div-icon").forEach(divIcon => {
				let s = divIcon.style
				s.width = s.height = size + "px"
				s.marginTop = s.marginLeft = -size / 2 + "px"
			})
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
	mounted() {
		this.setupGTAMap()
		// Send ref to App (earlier than ref="map" would resolve)
		this.setMap(this)
	},
	inject: ["setMap"]
}
</script>


<style>
.gtamap {
	height: 100%;
	z-index: 0;
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