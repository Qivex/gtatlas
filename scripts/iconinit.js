// Load icons
await fetch("icons/spritesheet.svg")
	.then(res => res.text())
	.then(data => {
		document.getElementById("spritesheet").innerHTML = data
	})