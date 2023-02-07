<template>
	<div :id="id" class="leaflet-component" :class="`tileset-${tilesetName}`"></div>
</template>


<script>
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import "leaflet-arrowheads"

import { pixel2leaflet } from "../tools/coord-transform.js"

// Creation of map icons
function createMapIcon(id, size) {
	return Leaflet.divIcon({
		html: `<svg><use href="#icon-${id}" color="var(--mapicon-color)"/></svg>`,
		iconSize: [size, size]
		// iconAnchor not needed (centered by default)
	})
}

// Recursive update of icon size
function updateGroupIconSize(group, size) {
	group.eachLayer(layer => {
		if (layer instanceof Leaflet.Marker) {
			let icon = layer.getIcon()
			icon.options.iconSize = [size, size]
			layer.setIcon(icon)
		} else if (layer instanceof Leaflet.LayerGroup) {
			updateGroupIconSize(layer, size)	// eachLayer() is flat -> recursion required
		}
	})
}

export default {
	name: "LeafletMap",
	props: {
		id: String,
		mapOptions: Object,
		tileOptions: Object,
		tileUrlTemplate: String,
		initialTileset: String,
		initialIconSize: Number
	},
	data() {
		return {
			instance: undefined,
			tilelayer: undefined,
			tilesetName: this.initialTileset,
			iconsize: this.initialIconSize,
			layers: {}
		}
	},
	computed: {
		tileURL() {
			// Can't use Leaflet.Util.template() because it wants to fill all placeholders immediately
			return this.tileUrlTemplate.replace("{tileset}", this.tilesetName)
		}
	},
	methods: {
		addLayers(newLayers) {
			if (newLayers instanceof Object && Object.values(newLayers).every(layer => layer instanceof Leaflet.Layer)) {
				// Don't overwrite existing layers
				for (let id in newLayers) {
					if (!Object.hasOwnProperty(this.layers,id)) {
						this.layers[id] = newLayers[id]
					}
				}
			} else {
				console.error("Something went wrong when adding layers: ", newLayers)
			}
		},
		setLayerVisibility(id, visible) {
			// Shortcut
			let layer = this.layers[id]
			// Ignore unknown id
			if (!layer) return
			// Adjust layer visibility (No error if not found by Leaflet)
			if (visible === true) {
				this.instance.addLayer(layer)
			} else {
				this.instance.removeLayer(layer)
			}
		},
		setTileset(name) {
			// Tileset name is represented as class -> styling applied in wrapping component
			this.tilesetName = name
			// Update tile source
			this.tilelayer.setUrl(this.tileURL)
		},
		setIconSize(size) {
			this.iconsize = size
			// Update the layer definitions recursively
			for (let id in this.layers) {
				updateGroupIconSize(this.layers[id], size)
			}
		},
		setIconColor(color) {
			// Check if input is valid color
			if (!CSS.supports("color", color)) return
			// Update CSS variable (https://css-tricks.com/updating-a-css-variable-with-javascript)
			this.$el.style.setProperty("--mapicon-color", color)	// Previously document.documentElement
		},
		getToolset() {
			// Leaflet-Arrowheads configuration is different on mobile
			let arrowConfig = {
				fill: true,
				size: "15px",
				frequency: "50px",
				yawn: 50
			}
			if (this.$isTouchDevice) {
				arrowConfig.size = "10px"
				arrowConfig.frequency = "30px"
			}
			// Different "this" in Object
			let iconsize = this.iconsize
			// Shortcuts used for easier construction of layers
			return {
				marker(point, iconname) {
					return Leaflet.marker(pixel2leaflet(point), {icon: createMapIcon(iconname, iconsize)})
				},
				line(points) {
					return Leaflet.polyline(points.map(p => pixel2leaflet(p)), {color: "#FFF"}).arrowheads(arrowConfig)
				},
				circle(point, radius, color, opacity) {
					// Todo: Radius transformation in coordinate-transformation module!
					return Leaflet.circle(pixel2leaflet(point), {radius: radius/46.3, stroke: false, color: color, fillOpacity: opacity})
				},
				group(elements) {
					// Not using "arguments" because input can/should be result of .map()
					return Leaflet.featureGroup(elements)
				}
			}
		}
	},
	mounted() {
		this.instance = Leaflet.map(this.id, this.mapOptions)
		this.tilelayer = Leaflet.tileLayer(this.tileURL, this.tileOptions).addTo(this.instance)
	}
}
</script>


<style>
/* Define initial color (SVG defaults to black) */
.leaflet-component {
	--mapicon-color: #F0F0F0;
}

/* Leaflet's DivIcon doesn't have transparent background by default */
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