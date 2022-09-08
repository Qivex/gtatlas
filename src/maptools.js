import Leaflet from "leaflet"
import "leaflet-arrowheads"

// Convert between Leaflet coordinates and my pixel-notes from Paint
function pixel2crs(point) {
	let x = point[0]
	let y = point[1]
	// return [-y/32, x/32]
	return [-y/46.27, (x-1024)/46.33]
}

function crs2pixel(point) {
	let lat = point.lat
	let lng = point.lng
	// return [-32*lng, 32*lat]
	return [46.33*lng + 1024, -46.27*lat]
}


// Configure arrowheads
let isMobile = false // TODO
function getArrowConfig() {
	let config = {
		fill: true,
		size: "15px",
		frequency: "50px",
		yawn: 50
	}
	if (isMobile) {
		config.size = "10px"
		config.frequency = "30px"
	}
	return config
}


// Icons
function createMapIcon(id, size) {
	return Leaflet.divIcon({
		html: `<svg><use href="#icon-${id}" color="var(--business-color)"/></svg>`,
		iconSize: [size, size]	// iconAnchor not needed, centered by default
	})
}


// Shortcuts used in methods constructing maplayers
function marker(point, iconname, iconsize) {
	return Leaflet.marker(pixel2crs(point), {icon: createMapIcon(iconname, iconsize)})
}

function line(points) {
	return Leaflet.polyline(points.map(p => pixel2crs(p)), {color: "#FFF"}).arrowheads(getArrowConfig())
}

function circle(point, radius, color, opacity) {
	return Leaflet.circle(pixel2crs(point), {radius: radius/46.3, stroke: false, color: color, fillOpacity: opacity})
}

function group(elements) {
	return Leaflet.featureGroup(elements)
}

export { pixel2crs, crs2pixel, marker, line, circle, group }