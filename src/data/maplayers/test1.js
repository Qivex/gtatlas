let coords = []

export default function(Leaflet, marker, circle, line) {
	let p1 = [5000, 5000]
	let p2 = [5200, 5600]
	let m1 = marker(p1, "warehouse-crates")
	let m2 = marker(p2, "supplies-crate")
	return Leaflet.featureGroup([m1, m2, line([p1, p2]), circle(p1, 128, "var(--gta-yellow)")])
}