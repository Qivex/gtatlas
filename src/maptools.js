import Leaflet from "leaflet"
import "leaflet-arrowheads"

// Convert between Leaflet coordinates and my pixel-notes from Paint
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
	let anchor = Math.ceil(size / 2)
	return Leaflet.divIcon({
		html: `<svg width="${size}" height="${size}"><use href="#icon-${id}" color="var(--business-color)"/></svg>`,
		iconSize: [size, size],
		iconAnchor: [anchor, anchor]
	})
}


// Shortcuts used in methods constructing maplayers
function marker(point, iconname) {
	return Leaflet.marker(pixel2crs(point), {icon: createMapIcon(iconname, 35)})
}

function line(points) {
	return Leaflet.polyline(points.map(p => pixel2crs(p)), {color: "white"}).arrowheads(getArrowConfig())
}

function circle(point, radius, color) {
	return Leaflet.circle(pixel2crs(point), {radius: radius/32, stroke: false, color: color, fillOpacity: 0.5})
}

export { pixel2crs, crs2pixel, marker, line, circle }