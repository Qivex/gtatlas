<template>
	<aside class="layerselect">
		<div class="layerselect-toggle" @click.left="toggleHidden"></div>
		<div class="layerselect-content">
			<PropertyTree :structure="menutree" :onchange="setLayerVisibility"/>
		</div>
	</aside>
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
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden"),
		setLayerVisibility(id, visible) {
			this.map.setLayerVisibility(id, visible)
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
	}
}
</script>


<style>
.layerselect {
	position: absolute;
	transition: transform 0.5s;
}

@media (prefers-reduced-motion) {
	.layerselect {
		transition: transform 0s;
	}
}

.layerselect-content {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	backdrop-filter: blur(5px);
	background-color: rgba(0,0,0,0.5);
}

.layerselect-toggle {
	position: absolute;
	background-color: #000;
}

.layerselect-toggle::after {
	position: absolute;
	width: 2rem;
	height: 2rem;
	content: "";
	background-image: url(icons/hide-arrow.svg);
}

/* Desktop */
@media (pointer: fine) {
	.layerselect {
		width: 20rem;
		height: 100%;
		top: 0px;
	}

	.layerselect.hidden {
		transform: translateX(-100%);
	}

	.layerselect-content::-webkit-scrollbar {
		width: 1rem;
	}

	.layerselect-content::-webkit-scrollbar-thumb {
		background: #788888;
		background-clip: padding-box;
		border: 0.3em solid transparent;
		border-radius: 1rem;
	}

	.layerselect-toggle {
		width: 2rem;
		height: 4rem;
		top: calc(50% - 2rem);
		left: 100%;
		cursor: pointer;	/* https://stackoverflow.com/questions/45049873 */
		border-radius: 0 1rem 1rem 0;
	}

	.layerselect-toggle::after {
		top: 1rem;
	}

	.hidden > .layerselect-toggle::after {
		transform: rotate(180deg);
	}
}

/* Mobile */
@media (pointer: coarse) {
	@media (orientation: portrait) {
		.layerselect {
			width: 100%;
			height: 50%;
			bottom: 0px;
		}

		.layerselect.hidden {
			transform: translateY(100%);
		}

		.layerselect-toggle {
			width: 8rem;
			height: 4rem;
			top: -4rem;
			left: calc(50% - 4rem);
			border-radius: 1rem 1rem 0 0;
		}

		.layerselect-toggle::after {
			top: 1rem;
			left: 3rem;
			transform: rotate(-90deg);
		}

		.hidden >.layerselect-toggle::after {
			transform: rotate(90deg);
		}
	}

	@media (orientation: landscape) {

	}
}
</style>