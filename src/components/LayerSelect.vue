<template>
	<div class="layerselect">
		<PropertyTree :structure="menutree" :onchange="setLayerVisibility"/>
	</div>
</template>


<script>
import PropertyTree from "./PropertyTree.vue"

import { decodeVisibleLayersFromURLParam } from "../data/maplayers.js"
import menutree from "../data/menutree.json"

let visibleLayersInLocalStorage = window.localStorage.getItem("map-layers")
let visibleLayersInURLParam = decodeVisibleLayersFromURLParam()

function applyLocalStorage(layer) {
	if (visibleLayersInLocalStorage) {
		layer.initial = visibleLayersInLocalStorage.includes(layer.id)
	}
}

function applyURLParam(layer) {
	if (visibleLayersInURLParam) {
		layer.initial = visibleLayersInURLParam.includes(layer.id)
	}
}

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
			menutree,
			visiblelayers: []
		}
	},
	methods: {
		setLayerVisibility(id, visible) {
			this.getMap().setLayerVisibility(id, visible)
		},
		applyVisibility(prop) {
			// Traverse the menutree
			if (prop.children) {
				prop.children.forEach(child => this.applyVisibility(child))
				return
			}
			// Determine if layer should be visible
			applyLocalStorage(prop)
			applyURLParam(prop)
			// Save for later access (cant use setLayerVisibility yet because no ref to map)
			if (prop.initial) {
				this.visiblelayers.push(prop.id)
			}
		}
	},
	beforeMount() {
		// Overwrite the default initial state with localStorage or URL param
		this.applyVisibility(this.menutree)
		// Send visiblelayers to app for later use on mount (getMap doesnt know ref to map yet)
		this.$root.initialvisiblelayers = this.visiblelayers
	},
	inject: ["getMap"]
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