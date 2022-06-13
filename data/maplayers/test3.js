// Stress Test
let grid = []
for (let x=0; x<32; x++) {
	for (let y=0; y<32; y++) {
		grid.push([-8*x, 8*y])
	}
}

let nightclub = Leaflet.icon({
	iconUrl: "nightclub.svg",
	iconSize: [35,35],
	iconAnchor: [18,18]
})

export default Leaflet.featureGroup(grid.map(p => Leaflet.marker(p, {icon: nightclub})))