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
		top: 0px;
		left: 0px;
		width: 20rem;
		height: 100vh;
	}
}

@media (pointer: coarse) {
	.layerselect {
		width: 100%;
	}
}

@media (pointer: fine) {
	.layerselect-toggle {
		width: 2rem;
		height: 4rem;
		top: calc(50% - 2rem);
		left: 100%;
		cursor: pointer;	/* https://stackoverflow.com/questions/45049873 */
		border-radius: 0 1rem 1rem 0;
	}
}
</style>