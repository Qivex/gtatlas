<template>
	<GTA5Map id="gta5map" ref="map"/>
	<MapMenu/>
	<div id="mapicons"></div>
</template>


<script>
import GTA5Map from "../components/GTA5Map.vue"
import MapMenu from "../components/MapMenu.vue"

export default {
	name: "GTA5App",
	components: {
		GTA5Map,
		MapMenu
	},
	data() {
		return {
			initialvisiblelayers: [], // State transfer from LayerSelect to GTA5Map
		}
	},
	provide() {
		return {
			setInitialVisibleLayers: this.setInitialVisibleLayers,
			getMap: this.getMap
		}
	},
	methods: {
		setInitialVisibleLayers(layers) {
			// LayerSelect component provides initially visible layers
			this.initialvisiblelayers = layers
		},
		getMap() {
			// Returns reference to internal LeafletMap (Skip GTA5Map)
			return this.$refs.map.map
		}
	},
	created() {
		// Setup localization
		let userLang = window.navigator.language.substring(0,2)	// Only use primary tag
		this.$lang.value = this.$fromConfig("lang", "lang", this.$availableLanguages.includes(userLang) ? userLang : "en")	// Fallback to "en" if user language has no translations
		this.$persist("lang", () => this.$lang.value)
	},
	mounted() {
		// Load GTA icons
		/* Icons are included like this because:
		- the icons need styling (currentColor) -> Cant use <img> or <view>
		- also Firefox loads SVG-<view> really inefficiently: https://bugzilla.mozilla.org/show_bug.cgi?id=1121693
		- <use> is way more efficient than cloning the same SVG into every icon (inline component)
		- <template src=""> fails with any file extension != html -> Manual fetch needed
		- https://www.npmjs.com/package/vue-svg-inline-loader isn't compatible with Leaflet's (Div)Icons */
		fetch("icons/gtaicons.svg")
			.then(res => res.text())
			.then(data => {
				document.getElementById("mapicons").innerHTML = data
			})
		// Initialize visible layers on Map
		this.initialvisiblelayers.forEach(id => this.getMap().setLayerVisibility(id, true))
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
	color: #fff;	/* Initial org-color for icons (defaults to black) */
	font-family: arial;
}

p,h1,h2,h3,h4,h5,h6 {
	margin: 0px;
	color: #fff;
	font-weight: normal;
}

a {
	color: #266bec;
}

/* Would cause blue outline on mobile (https://stackoverflow.com/a/66209706) */
@media (pointer: fine) {
	.pointer {
		cursor: pointer;
	}
}

/* SVG document with all icons as <symbol> */
#mapicons {
	display: none;
}
</style>