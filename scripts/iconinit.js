// Load icons
await fetch("icons/gtaicons.svg")
	.then(res => res.text())
	.then(data => {
		document.getElementById("mapicons").innerHTML = data
	})