<template>
	<div class="sidebyside">
		<div>
			<GTA5Map id="map" ref="map"/>
			<p>{{roundFloor(estimatedLatitude, 3) + " | " + roundFloor(estimatedLongitude, 3)}}</p>
		</div>
		<div class="pixel" :style="style">
			<img src="https://igta5.com/images/gtav-map-satellite-huge.jpg"/>
			<svg viewBox="0,0,20,20">
				<path d="M0,0 l20,20 M20,0 l-20,20" stroke-width="1">
					<animate attributeName="stroke" values="#fff;#000" dur="2s" repeatCount="indefinite" calcMode="discrete"/>
				</path>
			</svg>
			<p>{{pixelX + " | " + pixelY}}</p>
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
			marker: new Leaflet.marker([0,0]),
			canvasZoom: 11,
			crosshairSize: 32
		}
	},
	computed: {
		map() {
			// Shortcut to Leaflet map (not component!)
			return this.$refs.map.map.instance	// GTA5Map -> LeafletMap -> Leaflet "Map" class instance
		},
		estimatedLatitude() {
			return -this.pixelY / 46.27
		},
		estimatedLongitude() {
			return (this.pixelX - 1024) / 46.33
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
			// Move map and estimated marker
			let latlng = [this.estimatedLatitude, this.estimatedLongitude]
			this.map.setView(latlng, 10)
			this.marker.setLatLng(latlng)
			// Add marker if first select
			if (!this.map.hasLayer(this.marker)) {
				this.map.addLayer(this.marker)
			}
		},
		roundFloor(f, digits) {
			let shift = Math.pow(10, digits)
			return Math.round(f * shift) / shift
		}
	},
	mounted() {
		this.map.setMaxZoom(9) // Overwrite default
		this.selectPixel(4000,6000)
		// Construct graticule
		let lines = []
		let step = 1/20
		for (let lat = 0; lat > -192; lat -= step) {
			lines.push([[lat,0],[lat,128]])  // Horizontal lines
		}
		for (let lng = 0; lng < 128; lng += step) {
			lines.push([[0,lng],[-192,lng]]) // Vertical lines
		}
		let graticule = Leaflet.polyline(lines, {color: "#FFF", weight: 0.7})
		graticule.addTo(this.map)
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