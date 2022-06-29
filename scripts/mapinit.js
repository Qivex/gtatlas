// Leaflet map basics
let gtamap = Leaflet.map("map", {
	// No earth curvature
	crs: Leaflet.CRS.Simple,
	// No default controls
	attributionControl: false,
	zoomControl: true,
	// Available navigation
	maxBounds: [	// margin: vertical 64, horizontal 128
		[64,-128],
		[-320,384]
	],
	maxZoom: 7,
	minZoom: 2,
	zoomSnap: 0.5,
	zoomDelta: 0.5,
	// Initial state
	center: [-200,128],
	zoom: 3
})

Leaflet.tileLayer("tiles/{z}_{x}_{y}.jpg", {
	// Available tiles
	maxNativeZoom: 5,
	minNativeZoom: 1,
	bounds: [
		[0,0],
		[-256,256]
	],
	// No repetition
	noWrap: true
}).addTo(gtamap)



// Helper functions
function pixel2crs(point) {
	let x = point[0]
	let y = point[1]
	return [-y/32, x/32]
}

function crs2pixel(point) {
	let lat = point[0]
	let lng = point[1]
	return [-32*lng, 32*lat]
}

let iconcache = {}

function getIcon(name) {
	/* Dynamic scaling of icons isnt really possible:
	- icon.options.iconSize doesnt affect already rendered ones
	- SVG can be resized, but anchor will be wrong */
	if (!iconcache[name]) {
		iconcache[name] = Leaflet.divIcon({
			html: `<svg width="35" height="35"><use href="#icon-${name}" class="org-color"/></svg>`,
			iconSize: [35,35],
			iconAnchor: [18,18]
		})
	}
	return iconcache[name]
}

function isMobile() {
	// TODO
	return false
}

function getArrowConfig() {
	let config = {
		fill: true,
		size: "15px",
		frequency: "50px",
		yawn: 50
	}
	if (isMobile()) {
		config.size = "10px"
		config.frequency = "30px"
	}
	return config
}

function marker(point, iconname) {
	return Leaflet.marker(pixel2crs(point), {icon: getIcon(iconname)})
}

function line(points) {
	return Leaflet.polyline(points.map(p => pixel2crs(p)), {color: "white"}).arrowheads(getArrowConfig())
}

function circle(point, radius, color) {
	return Leaflet.circle(pixel2crs(point), {radius: radius/32, stroke: false, color: color, fillOpacity: 0.5})
}



// Import toggleable layers
let maplayers = {}

let files = [
	"ammunation",
	"test1",
	/* Stress test
	"test2",
	"test3" */
].forEach(id => {
	import(`/data/maplayers/${id}.js`).then(module => {
		console.log("Imported maplayer " + id)
		// Can be factory method or Leaflet.featureGroup
		let layer = module.default
		if (typeof layer === "function") {
			layer = layer(Leaflet, marker, circle, line)	//document.getElementById("popup")
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



// Modifier functions
function setMapLayer(id, visible) {
	// TEMP
	console.log("Updated " + id + " to " + visible);
	// Shortcut
	let layer = maplayers[id]
	// Ignore unknown ids
	if (!layer) return
	// Adjust layer visibility (No error if not found by Leaflet)
	if (visible === true)
		gtamap.addLayer(layer)
	else
		gtamap.removeLayer(layer)
}

function setOrgColor(colstring) {
	// Check if input is valid color
	if (!CSS.supports("color", colstring)) return
	// Update CSS variable (https://css-tricks.com/updating-a-css-variable-with-javascript)
	document.documentElement.style.setProperty("--org-color", colstring)
}

export {gtamap, setMapLayer, setOrgColor}
