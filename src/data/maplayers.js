import mapdata from "./mapdata.json"
import { marker, line, circle, group } from "../maptools.js"

const iconSize = 35	// Todo: Use localStorage

let layers = {}
let version = mapdata.version

mapdata.layers.forEach(layer => {
	let builder
	// Decide which builder to use
	switch (layer.id) {
		case "test1":
			builder = p => marker(p, "ammunation", iconSize)	// More generic: layer.id as iconname!
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

export {layers as default, version}
// Todo: Provide lookup (for each version): index -> id, eg 0 -> "ammunation"
// Required to encode visible information as URL param