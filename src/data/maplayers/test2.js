// Stress Test
let grid = []
for (let x=0; x<16; x++) {
	for (let y=0; y<16; y++) {
		grid.push([512*x, 512*y])
	}
}

export default function(Leaflet, marker, circle, line) {
	return Leaflet.featureGroup(grid.map(p => marker(p, "nightclub")))
}