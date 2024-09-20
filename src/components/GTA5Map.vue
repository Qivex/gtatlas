<template>
	<LeafletMap ref="leafletmap" class="gta5map" v-bind="leafletOptions"/>
	<LeafletPopup ref="leafletpopup">
		<Component :is="currentPopup" v-bind="popupData"/>
	</LeafletPopup>
</template>


<script>
import LeafletMap from "./LeafletMap.vue"
import LeafletPopup from "./LeafletPopup.vue"

import Popup1 from "./popups/Popup1.vue"
import Popup2 from "./popups/Popup2.vue"

import Leaflet from "leaflet"

import mapdata from "../data/mapdata.json"

export default {
	name: "GTA5Map",
	components: {
		LeafletMap,
		LeafletPopup,
		Popup1,
		Popup2
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
			currentPopup: null,
			popupData: null,
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
	methods: {
		constructMapLayer(layer) {
			// Use provided methods to create layers
			let ts = this.map.getToolset()
			// Use different setup depending on id
			switch (layer.id) {
				case "test1": {
					let icon = ts.icon("ammunation", "var(--gta-gray1)")
					let group = ts.group(layer.data.map(p => ts.marker(p, icon)))
					this.definePopup(group, "Popup1")
					return group
				}
				case "test2": {
					let icon1 = ts.icon("supplies-crate", "var(--gta-green)")
					let icon2 = ts.icon("warehouse-crates")
					let group = ts.group(layer.data.map((p,i) => {
						let marker1 = ts.marker(p[0], icon1)
						let marker2 = ts.marker(p[1], icon2)
						this.definePopup(marker1, "Popup2", {text: "Source", number: i+1})
						this.definePopup(marker2, "Popup2", {text: "Target", number: i+1})
						return ts.group([
							marker1,
							marker2,
							ts.line([p[0], p[1]]),
							ts.circle(p[0], 128, "#F0C850", 0.5)
						])
					}))
					return group
				}
			}
		},
		definePopup(layer, component, data) {
			layer.bindPopup(null, {minWidth: 200, maxWidth: 200})
			layer.on("popupopen", e => {
				// Mount component
				this.currentPopup = component
				this.popupData = data
				// Move Vue component into Leaflet popup (keeps reactivity!)
				e.popup.setContent(this.$refs.leafletpopup.$el)
			})
			// Unmount component
			layer.on("popupclose", () => this.currentPopup = null)
		}
	},
	mounted() {
		// Construct all maplayers from data using tools
		let maplayers = {}
		mapdata.layers.forEach(layer => maplayers[layer.id] = this.constructMapLayer(layer))
		//let maplayers = constructMapLayers(mapdata, this.map.getToolset(), this.bindPopup)
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