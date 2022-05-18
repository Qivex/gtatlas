// Leaflet basics
window.gtamap = Leaflet.map("map", {
	// No earth curvature
	crs: Leaflet.CRS.Simple,
	// No default controls
	attributionControl: false,
	zoomControl: false,
	// Limit for movement
	maxBounds: [	// margin: vertical 64, horizontal 128
		[64,-128],
		[-320,384]
	],
	// Start pos
	center: [-200,128],
	zoom: 3
})

Leaflet.tileLayer("tiles/{z}_{x}_{y}.jpg", {
	// Available tiles
	maxZoom: 5,
	minZoom: 2,
	bounds: [
		[0,0],
		[-256,256]
	],
	// No repetition
	noWrap: true
}).addTo(gtamap)



// Toggleable layers
window.maplayers = {}

let files = [
	"ammunation",
	"test1",
	"test2",
	"test3"
].forEach(id => {
	import(`/data/maplayers/${id}.js`).then(module => {
		console.log("Imported maplayer " + id)
		// Can be factory method or Leaflet.featureGroup
		let layer = module.default
		if (typeof layer === "function") {
			layer = layer(Leaflet, marker)
		}
		// Add to lookup & map
		maplayers[id] = layer
		layer.addTo(gtamap)	//TODO: depend on state
		// TODO: Popup -> Several options
		// layer.bindPopup("test")
		// layer.on("click", () => gtamap.openPopup(...))
		// layer.on("popupopen", updatePopupContext)
	})
})



// Helper functions
window.setMapLayer = function(id, value) {
	// TEMP
	console.log("Updated " + id + " to " + value);
	// Shortcut
	let layer = maplayers[id]
	// Ignore unknown ids
	if (!layer) return
	// Adjust layer visibility (No error if not found by Leaflet)
	if (value === true)
		gtamap.addLayer(layer)
	else
		gtamap.removeLayer(layer)
}

window.setOrgColor = function(colstring) {
	// Check if input is valid color
	if (!CSS.supports("color", colstring)) return
	// Update CSS variable (https://css-tricks.com/updating-a-css-variable-with-javascript)
	document.documentElement.style.setProperty("--org-color", colstring)
}

function paint2crs(x, y) {
	return [-y/32, x/32];
}

function crs2paint(lat, lng) {
	return [-32*lng, 32*lat];
}

window.createIcon = function(name) {
	/* Dynamic scaling of icons isnt really possible:
	- icon.options.iconSize doesnt affect already rendered ones
	- SVG can be resized, but anchor will be wrong */
	return Leaflet.divIcon({
		html: `<svg width="35" height="35"><use href="#icon-${name}" class="org-color"/></svg>`,
		iconSize: [35,35],
		iconAnchor: [18,18]
	})
}

window.iconstore = {}
window.marker = function(x, y, iconname) {
	if (!iconstore[iconname]) {
		iconstore[iconname] = createIcon(iconname)
	}
	return Leaflet.marker(paint2crs(x,y), {icon: iconstore[iconname]})
}
