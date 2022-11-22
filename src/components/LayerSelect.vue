<template>
	<div class="layerselect">
		<PropertyTree :structure="menutree" :onchange="setLayerVisibility"/>
	</div>
</template>


<script>
import PropertyTree from "./PropertyTree.vue"

import { decodeVisibleLayersFromURLParam } from "../data/maplayers.js"
import menutree from "../data/menutree.json"

// Modify "initial" values of menutree before using it in component
let visibleLayersInLocalStorage = window.localStorage.getItem("map-layers")
let visibleLayersInURLParam = decodeVisibleLayersFromURLParam()
let visiblelayers = []

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
	// Collect all initially visible layers (later used in GTAMap component)
	if (prop.initial) {
		visiblelayers.push(prop.id)
	}
}

applyInitialVisibility(menutree)

export default {
	name: "Selection",
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
		// Send visiblelayers to App for later use on mount (getMap doesnt know ref yet)
		this.setInitialVisibleLayers(visiblelayers)
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

@media (pointer: coarse) {
	.layerselect {
		width: 100%;
	}
}
</style>