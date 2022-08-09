// Stress Test
let grid = []
for (let x=0; x<16; x++) {
	for (let y=0; y<16; y++) {
		grid.push([32*x + 3000, 32*y + 3000])
	}
}

export default function(Leaflet, marker, circle, line) {
	return Leaflet.featureGroup(grid.map(p => marker(p, "nightclub")))
}