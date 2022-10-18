import mapdata from "./mapdata.json"
import { marker, line, circle, group } from "../maptools.js"

const iconSize = 35	// Todo: Use localStorage

let layers = {}
let version = mapdata.version

// Index lookup
let name2index = {}

mapdata.layers.forEach((layer, index) => {
	// Index lookup
	name2index[layer.id] = index
	// Decide which builder to use
	let builder
	switch (layer.id) {
		case "test1":
			builder = p => marker(p, "ammunation", iconSize)	// More generic: layer.id or layer.icon as iconname!
			break
		case "test2":
			builder = p => group([
				marker(p[0], "supplies-crate", iconSize),
				marker(p[1], "warehouse-crates", iconSize),
				line([p[0], p[1]]),
				circle(p[0], 128, "#F0C850", 0.5)
			])
			break
	}
	// Apply the builder-function to all layer components and group them
	layers[layer.id] = group(layer.data.map(builder))
})

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
			return Object.keys(layers)
		default:     // Decode desired state
			//TODO: Base64 encoded string, bit-order from name2index
			return []
	}
}

//function encodeVisibleLayersToURLParam(visiblelayers) {}

export {layers as default, version, name2index, decodeVisibleLayersFromURLParam}