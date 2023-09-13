<template>
	<div class="sidebyside">
		<div class="pixel" :style="style">
			<img src="https://igta5.com/images/gtav-map-satellite-huge.jpg"/>
			<svg viewBox="0,0,1000,1000">
				<path d="M500,0 v1000 M0,500 h1000" stroke-width="1">
					<animate attributeName="stroke" values="#fff;#000" dur="2s" repeatCount="indefinite" calcMode="discrete"/>
				</path>
			</svg>
			<p>{{pixelX + " | " + pixelY}}</p>
		</div>
		<div>
			<GTA5Map id="map" ref="map"/>
			<p>{{`${crosshairX} | ${crosshairY}`}}</p>
		</div>
	</div>
	<div class="options">
		<input type="number" min="0" max="8192" v-model="inputX"/>
		<p>|</p>
		<input type="number" min="0" max="8192" v-model="inputY"/>
		<button @click.left="selectPixel(inputX, inputY)">Select</button>
	</div>
</template>

<script>
import GTA5Map from "../components/GTA5Map.vue"
import Leaflet from "leaflet"

function round(number, stepCount) {
	// stepSize = 1 / stepCount
	return Math.round(number * stepCount) / stepCount
}

function estimateLatLngFromPixel(x, y) {
	return [
		-y / 46.27,
		(x - 1024) / 46.33
	]
}

export default {
	name: "GridApp",
	components: {
		GTA5Map
	},
	provide: {
		currentTileset: "render",
		// Unused:
		currentIconSize: undefined,
		currentBusinessColor: undefined,
		isTouchDevice: undefined
	},
	data() {
		return {
			inputX: 0,
			inputY: 0,
			pixelX: 0,
			pixelY: 0,
			crosshairLat: 0,
			crosshairLng: 0,
			accuracy: 50,	// Number of sub-steps between integer Leaflet-coordinates
			centerMarker: Leaflet.marker([0,0]),
			mapZoom: 9,
			canvasZoom: 11,	// Amount of screen-pixels per image-pixel
			crosshairSize: 1000
		}
	},
	computed: {
		map() {
			// Shortcut to Leaflet map (not component!)
			return this.$refs.map.map.instance	// GTA5Map -> LeafletMap -> Leaflet "Map" class instance
		},
		crosshairX() {
			return parseInt(this.crosshairLng * this.accuracy)
		},
		crosshairY() {
			return parseInt(this.crosshairLat * -this.accuracy)
		},
		style() {
			return {
				"--x": `${this.pixelX + 0.5}px`,
				"--y": `${this.pixelY + 0.5}px`,
				"--scale": 100 * this.canvasZoom + "%",
				"--crosshair-size": this.crosshairSize + "px"
			}
		}
	},
	methods: {
		selectPixel(x, y) {
			this.pixelX = x
			this.pixelY = y
			// Center map roughly on this coordinate
			let latlng = estimateLatLngFromPixel(x, y)
			this.map.setView(latlng, this.mapZoom)
			// Move marker to estimated center
			this.centerMarker.setLatLng(latlng)
		}
	},
	mounted() {
		// Disable Zooming & Panning
		this.map.setMinZoom(this.mapZoom)
		this.map.setMaxZoom(this.mapZoom)
		this.map.dragging.disable()
		// Initialize view
		this.centerMarker.addTo(this.map)
		this.selectPixel(4000,6000)
		// Crosshair
		function crosshairIcon(size) {
			return Leaflet.divIcon({
				html: `<svg viewBox="0 0 ${size} ${size}"><path d="M0,${size/2} h${size} M${size/2},0 v${size}" stroke="red"/></svg>`,
				iconSize: [size, size]
			})
		}
		const normalCH = crosshairIcon(32)
		const largeCH = crosshairIcon(1024)
		let crosshair = Leaflet.marker([0,0], {icon: normalCH})
		crosshair.addTo(this.map)
		// Change size on mousedown
		this.map.on("mousedown", e => crosshair.setIcon(largeCH))
		this.map.on("mouseup", e => crosshair.setIcon(normalCH))
		// Align crosshair to grid
		this.map.on("mousemove", e => {
			let ll = e.latlng
			this.crosshairLat = round(ll.lat, this.accuracy)
			this.crosshairLng = round(ll.lng, this.accuracy)
			crosshair.setLatLng([this.crosshairLat, this.crosshairLng])
		})
	}
}
</script>

<style>
@import url(../style/base.css);

/* comparison wrapper */
.sidebyside {
	height: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
}

/* required for absolute positioning of text & crosshair */
.sidebyside > div {
	position: relative;
}

/* vertical instead of horizontal */
@media (orientation: portrait) {
	.sidebyside {
		grid-template-columns: none;
		grid-template-rows: 50% 50%;
	}
}

.sidebyside p {
	background-color: rgba(0,0,0,0.5);
	position: absolute;
	left: 1rem;
	bottom: 1rem;
}

/* image wrapper to hide overflow */
.pixel {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

/* full map image */
.pixel img {
	image-rendering: pixelated;
	transform-origin: var(--x) var(--y);
}

/* different offsets depending on orientation */
@media (orientation: portrait) {
	.pixel img {
		transform: translate(50vw, 25vh)
			translateX(calc(-1 * var(--x)))
			translateY(calc(-1 * var(--y)))
			scale(var(--scale));
	}
}

@media (orientation: landscape) {
	.pixel img {
		transform: translate(25vw, 50vh)
			translateX(calc(-1 * var(--x)))
			translateY(calc(-1 * var(--y)))
			scale(var(--scale));
	}
}

/* centered crosshair */
.pixel svg {
	position: absolute;
	width: var(--crosshair-size);
	height: var(--crosshair-size);
	top: calc(50% - calc(var(--crosshair-size) / 2));
	left: calc(50% - calc(var(--crosshair-size) / 2));
}

/* No cursor on map (crosshair-marker instead) */
.sidebyside :first-child {
	cursor: none;
}

.options {
	display: flex;
	width: 14rem;
	height: 3rem;
	position: absolute;
	top: 1rem;
	left: calc(50% - 7rem);
	align-items: center;
	justify-content: center;
	background-color: rgba(0,0,0,0.5);
}

.options input {
	margin-inline: 0.5rem;
	width: 3rem;
}

.options button {
	margin-inline: 0.5rem;
}
</style>