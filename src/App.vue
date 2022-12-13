<template>
	<GTAMap id="gtamap"/>
	<MapMenu/>
	<div id="mapicons"></div>
</template>


<script>
import GTAMap from "./components/GTAMap.vue"
import MapMenu from "./components/MapMenu.vue"

import localizations from "./data/i18n.json"

export default {
	name: "App",
	components: {
		GTAMap,
		MapMenu
	},
	data() {
		return {
			useLocalStorage: false || window.localStorage.length > 0,
			currentLanguage: "en",
			initialvisiblelayers: [], // State transfer from LayerSelect to GTAMap
			map: undefined,	// Component doesn't exist yet
		}
	},
	provide() {
		return {
			isMobile: this.isMobile,
			getUseLocalStorage: this.getUseLocalStorage,
			toggleUseLocalStorage: this.toggleUseLocalStorage,
			translate: this.translate,
			updateLanguage: this.updateLanguage,
			setInitialVisibleLayers: this.setInitialVisibleLayers,
			setMap: this.setMap,
			getMap: this.getMap
		}
	},
	methods: {
		isMobile() {
			// Mobile devices have a coarse pointer (Todo: Should tablets use the desktop layout?)
			// Todo: Firefox thinks trackpads are coarse... Not even (any-pointer: fine)
			// See https://bugzilla.mozilla.org/show_bug.cgi?id=1638556
			return window.matchMedia("(pointer: coarse)").matches
		},
		getUseLocalStorage() {
			return this.useLocalStorage	
		},
		toggleUseLocalStorage() {
			this.useLocalStorage = !this.useLocalStorage
			// TODO: Clear (previous) localStorage on visibilitychange if disabled
		},
		translate(stringID) {
			let languageID = this.currentLanguage
			return localizations?.[languageID]?.[stringID]
		},
		updateLanguage(languageID) {
			if (languageID === this.currentLanguage) return
			this.currentLanguage = languageID
			document.querySelectorAll("[data-i18n]").forEach(node => {
				let stringID = node.dataset.i18n	// https://stackoverflow.com/questions/52514335
				let localizedString = this.translate(stringID)
				if (localizedString) {
					node.textContent = localizedString	// https://stackoverflow.com/questions/24427621
				}
			})
		},
		setInitialVisibleLayers(layers) {
			// LayerSelect component provides initially visible layers
			this.initialvisiblelayers = layers
		},
		setMap(map) {
			// GTAMap component provides ref to itself (earlier than this.$refs would resolve)
			this.map = map
		},
		getMap() {
			// Returns reference to map (preferable to handing a prop all the way down every component)
			return this.map
		}
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
		// Initialize localization (Todo: Use preference, cookie, HTTP-Header etc)
		this.updateLanguage("en")
		// Initialize visible layers on Map
		this.initialvisiblelayers.forEach(id => this.map.setLayerVisibility(id, true))
		// Clear localStorage on page close if deselected
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden" && !this.getUseLocalStorage()) {
				window.localStorage.clear()
			}
		})
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

/* Would cause blue outline on mobile! */
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