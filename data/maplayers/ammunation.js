let coords = [
	[4000,6000],
	[4200,6000]
]

export default function (Leaflet, marker, popupElement) {
	return Leaflet.featureGroup(coords.map(pixel => marker(pixel[0], pixel[1], "ammunation"))).bindPopup(popupElement, {className: "custom-popup"})
}