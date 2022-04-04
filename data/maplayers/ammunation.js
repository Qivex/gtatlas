let coords = [
	[5000,5000],
	[5200,5000]
]

export default function (Leaflet, marker) {
	return Leaflet.featureGroup(coords.map(pixel => marker(pixel[0], pixel[1], "ammunation")))
}