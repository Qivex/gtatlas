<template>
	<GTA5Map id="gta5map" ref="map"/>
	<MapMenu/>
	<div id="mapicons"></div>
</template>


<script>
import { computed } from "vue"

import GTA5Map from "../components/GTA5Map.vue"
import MapMenu from "../components/MapMenu.vue"

// Shortcut in "provide" for shared props
function wrapAsComputed(component, propName) {
	// Split into 2 args because otherwise ("this.propName" as arg) no getter/setter is used!
	return computed({
		get: () => component[propName],
		set: (newValue) => component[propName] = newValue
	})
}

export default {
	name: "GTA5App",
	components: {
		GTA5Map,
		MapMenu
	},
	inject:	["availableLanguages", "defaultLanguage", "currentLanguage", "getConfigValue", "persistOnClose"],
	provide() {
		return {
			setInitialVisibleLayers: this.setInitialVisibleLayers,
			getMap: this.getMap,
			currentTileset: wrapAsComputed(this, "tileset"),
			currentIconSize: wrapAsComputed(this, "iconSize"),
			currentBusinessColor: wrapAsComputed(this, "businessColor")
		}
	},
	data() {
		return {
			initialvisiblelayers: [], // State transfer from LayerSelect to GTA5Map
			tileset: undefined,
			iconSize: undefined,
			businessColor: undefined
		}
	},
	watch: {
		tileset(name) {
			this.getMap()?.setTileset(name)
		},
		iconSize(size) {
			this.getMap()?.setIconSize(size)
		},
		businessColor(color) {
			this.getMap()?.setIconColor(color)
		}
	},
	methods: {
		setInitialVisibleLayers(layers) {
			// LayerSelect component provides initially visible layers
			this.initialvisiblelayers = layers
		},
		getMap() {
			// Returns reference to internal LeafletMap (Skip GTA5Map)
			return this.$refs.map?.map
		}
	},
	created() {
		// Setup localization
		this.currentLanguage = this.getConfigValue("lang", "lang", this.defaultLanguage)
		this.persistOnClose("lang", () => this.currentLanguage)
		// Setup tileset
		this.tileset = this.getConfigValue("tileset", "map-tileset", "render")
		this.persistOnClose("map-tileset", () => this.tileset)
		// Setup icon size
		this.iconSize = parseInt(this.getConfigValue("iconsize", "map-iconsize", 35))
		this.persistOnClose("map-iconsize", () => this.iconSize)
		// Setup business color
		this.businessColor = this.getConfigValue("color", "map-businesscolor", "#F0F0F0")
		this.persistOnClose("map-businesscolor", () => this.businessColor)
	},
	mounted() {
		// Initialize visible layers on Map
		this.initialvisiblelayers.forEach(id => this.getMap().setLayerVisibility(id, true))
	}
}
</script>


<style>
@import url(../style/gtacolors.css);
@import url(../style/base.css);

/* SVG document with all icons as <symbol> */
#mapicons {
	display: none;
}
</style>