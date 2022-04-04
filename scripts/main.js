// Property Tree
import PropertyScope from "/scripts/propertyscope.js"
import model from "/data/properties.js"	//TODO: fetch JSON instead

// Map Init
import "/scripts/mapinit.js"

// Load icons
fetch("icons/spritesheet.svg")
	.then(res => res.text())
	.then(data => {
		document.getElementById("spritesheet").innerHTML = data
		setOrgColor("#F79F7B")	// currentcolor refs current element (not source), so can't define it there
		// Note: Maybe set color in CSS based on class? SVG attributes are very intertwined with CSS ones (which has priority?)
	})

//TEMP
marker(4000,4000,"garage").addTo(gtamap)
marker(4200,4000,"garage").addTo(gtamap)


// Property Tree
let toggleHidden = event => event.target.parentNode.classList.toggle("hidden")
PetiteVue.createApp({PropertyScope, model, toggleHidden, setMapLayer}).mount("#selection")