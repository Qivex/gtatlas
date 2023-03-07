<template>
	<div class="layerselect">
		<PropertyTree :structure="menutree" :onchange="setLayerVisibility"/>
	</div>
</template>


<script>
import PropertyTree from "./PropertyTree.vue"

import mapdata from "../data/mapdata.json"
import menutree from "../data/menutree.json"

function decodeVisibleLayersFromURLParam() {
	// URL query
	let usp = new URLSearchParams(window.location.search)
	let encodedIconState = usp.get("hide")
	switch (encodedIconState) {
		case null:   // No URL param specified
			return null
		case "all":  // Don't show any icons
			return []
		case "none": // Show all icon layers
			return Object.values(mapdata.layers).map(layer => layer.id)
		default:     // Decode desired state
			// Todo: Base64 encoded string, bit-order of all layers?
			return []
	}
}

// Modify "initial" values of menutree before using it in component
let visibleLayersInLocalStorage = []	//window.localStorage.getItem("map-layers")
let visibleLayersInURLParam = decodeVisibleLayersFromURLParam()
let visibleLayers = []

function applyInitialVisibility(prop) {
	// Traverse the property
	if (prop.children) {
		prop.children.forEach(child => applyInitialVisibility(child))
		return
	}
	// Determine if layer should be visible:
	if (visibleLayersInLocalStorage) {	// Consider localStorage
		prop.initial = visibleLayersInLocalStorage.includes(prop.id)
	}
	if (visibleLayersInURLParam) {	// Consider URL param
		prop.initial = visibleLayersInURLParam.includes(prop.id)
	}
	// Collect all initially visible layers (later used in GTA5Map component)
	if (prop.initial) {
		visibleLayers.push(prop.id)
	}
}

applyInitialVisibility(menutree)

export default {
	name: "LayerSelect",
	components: {
		PropertyTree
	},
	props: {
		map: Object
	},
	data() {
		return {
			menutree
		}
	},
	methods: {
		setLayerVisibility(id, visible) {
			this.getMap().setLayerVisibility(id, visible)
		}
	},
	created() {
		// Send visiblelayers to app for later use on mount (getMap can't know ref yet)
		this.setInitialVisibleLayers(visibleLayers)
	},
	inject: ["getMap", "setInitialVisibleLayers"]
}
</script>


<style>
@media (pointer: fine) {
	.layerselect {
		position: absolute;
		top: var(--navbar-height, 0px);
		left: 0px;
		width: 20rem;
		height: calc(100vh - var(--navbar-height, 0px));
		transform: translateX(-100%);
	}
}
</style>