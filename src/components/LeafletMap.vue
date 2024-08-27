<template>
	<div :id="id" class="leaflet-component" :class="`tileset-${tilesetName}`" :style="{'color': iconcolor}"></div>
</template>


<script>
import "leaflet/dist/leaflet.css"
import Leaflet from "leaflet"
import "leaflet-arrowheads"

// Coordinate transform
function point2latlng(point) {
	let x = point[0]
	let y = point[1]
	return [-y/64, x/64]
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
		initialIconSize: Number,
		initialIconColor: String
	},
	inject: ["isTouchDevice"],
	data() {
		return {
			instance: undefined,
			tilelayer: undefined,
			tilesetName: this.initialTileset,
			iconsize: this.initialIconSize,
			iconcolor: this.initialIconColor,
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
		getAllVisibleLayerNames() {
			// Get all layer names & filter for currently visible
			return Object.keys(this.layers)
				.filter(id => this.instance.hasLayer(this.layers[id]))
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
			if (!CSS.supports("color", color)) return	// Check if input is valid color
			this.iconcolor = color
		},
		getToolset() {
			// Leaflet-Arrowheads configuration is different on mobile
			let arrowConfig = {
				fill: true,
				size: "15px",
				frequency: "50px",
				yawn: 50
			}
			if (this.isTouchDevice) {
				arrowConfig.size = "10px"
				arrowConfig.frequency = "30px"
			}
			// Different "this" in Object
			let iconsize = this.iconsize
			// Shortcuts used for easier construction of layers
			return {
				icon(id, color) {
					if (!CSS.supports("color", color)) {
						color = "currentcolor"
					}
					return Leaflet.divIcon({
						html: `<svg><use href="#icon-${id}" color="${color}"/></svg>`,
						iconSize: [iconsize, iconsize]
						// iconAnchor not needed (centered by default)
					})
				},
				marker(point, icon) {
					return Leaflet.marker(point2latlng(point), {icon: icon})
				},
				line(points) {
					return Leaflet.polyline(points.map(p => point2latlng(p)), {color: "#FFF"}).arrowheads(arrowConfig)
				},
				circle(point, radius, color, opacity) {
					return Leaflet.circle(point2latlng(point), {radius: radius/64, stroke: false, color: color, fillOpacity: opacity})
				},
				group(elements) {
					// Not using "arguments" because input can/should be result of .map()
					return Leaflet.featureGroup(elements)
				}
			}
		},
		enableCrosshairMode() {
			// Create crosshair
			function crosshairIcon(size) {
				return Leaflet.divIcon({
					html: `<svg viewBox="0 0 ${size} ${size}"><path d="M0,${size/2} h${size} M${size/2},0 v${size}" stroke="red"/></svg>`,
					iconSize: [size, size]
				})
			}
			const normalCH = crosshairIcon(50)
			const largeCH = crosshairIcon(2000)
			// Add to map
			let crosshair = Leaflet.marker([0,0], {icon: normalCH, autoPanOnFocus: false})
			crosshair.addTo(this.instance)
			// Change map attributes
			document.body.classList.add("crosshair")
			this.instance.setMaxZoom(10)
			// Toggle size
			this.instance.on("contextmenu", e => {
				if (crosshair.getIcon() === largeCH) {
					crosshair.setIcon(normalCH)
				} else {
					crosshair.setIcon(largeCH)
				}
			})
			// Align crosshair to grid
			function align(coord) {
				return Math.round(coord * 64) / 64
			}
			this.instance.on("mousemove", e => {
				let ll = e.latlng
				crosshair.setLatLng([align(ll.lat), align(ll.lng)])
			})
			// Insert coordinate into clipboard
			this.instance.on("click", e => {
				let ll = crosshair.getLatLng()
				window.navigator.clipboard.writeText(`[${64 * ll.lng},${-64 * ll.lat}]`)
			})
		}
	},
	mounted() {
		this.instance = Leaflet.map(this.id, this.mapOptions)
		this.tilelayer = Leaflet.tileLayer(this.tileURL, this.tileOptions).addTo(this.instance)
		// Debug mode: Used to enter & check coordinates
		let para = new URLSearchParams(window.location.search)
		if (para.has("crosshair")) {
			this.enableCrosshairMode()
		}
	}
}
</script>


<style>
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

/* Debug mode */
.crosshair * {
	cursor: none;
}
</style>