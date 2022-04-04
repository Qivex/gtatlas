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


// i18n
let currentLanguage = "en"
let updateLanguage = language => currentLanguage = language
let i18nLookup = {}
let t = text => {return "i18n-" + currentLanguage + "-" + text}
// PetiteVue.createApp({currentLanguage, updateLanguage, i18nLookup, t}).mount("body")
/* Problems:
- nested v-scopes dont work
- reactified scope required to allow dynamic updates*/
