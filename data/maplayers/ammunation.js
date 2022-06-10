let coords = [
	[4000,6000],
	[4200,6000]
]

export default function (Leaflet, marker) {
	return Leaflet.featureGroup(coords.map(pixel => marker(pixel, "ammunation")))	//.bindPopup(popupElement, {className: "custom-popup"})
}