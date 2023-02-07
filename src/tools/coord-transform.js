// Converts between Leaflet coordinates and my pixel-notes from Paint
function pixel2leaflet(point) {
	let x = point[0]
	let y = point[1]
	// return [-y/32, x/32]
	return [-y/46.27, (x-1024)/46.33]
}

function leaflet2pixel(point) {
	let lat = point.lat
	let lng = point.lng
	// return [-32*lng, 32*lat]
	return [46.33*lng + 1024, -46.27*lat]
}

export {
	pixel2leaflet,
	leaflet2pixel
}