// Property Tree
import PropertyScope from "/scripts/propertyscope.js"
import model from "/data/properties.js"	//TODO: fetch JSON instead

import "/scripts/mapinit.js"

import "/scripts/iconinit.js"

// Note: Maybe set color in CSS based on class? SVG attributes are very intertwined with CSS ones (which has priority?)
setOrgColor("#F79F7B")	// currentcolor refs current element (not source), so can't define it there

//TEMP
marker(4000,4000,"garage").addTo(gtamap)
marker(4200,4000,"garage").addTo(gtamap)


// Property Tree
let toggleHidden = event => event.target.parentNode.classList.toggle("hidden")
PetiteVue.createApp({PropertyScope, model, toggleHidden, setMapLayer}).mount("#selection")
