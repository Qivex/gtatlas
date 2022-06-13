// Stress Test
let grid = []
for (let x=0; x<32; x++) {
	for (let y=0; y<32; y++) {
		grid.push([256*x, 256*y])
	}
}

export default function(Leaflet, marker, circle, line) {
	return Leaflet.featureGroup(grid.map(p => marker(p, "nightclub")))
}