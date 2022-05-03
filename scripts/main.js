// Property Tree
import PropertyTree from "/scripts/propertytree.js"
import model from "/data/properties.js"	//TODO: fetch JSON instead

import "/scripts/mapinit.js"
import "/scripts/iconinit.js"

// Note: Maybe set color in CSS based on class? SVG attributes are very intertwined with CSS ones (which has priority?)
setOrgColor("#F79F7B")	// currentcolor refs current element (not source), so can't define it there


// Vue Init
Vue.createApp({
	data() {
		return {model}
	},
	methods: {
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden"),
		setMapLayer
	},
	components: {
		PropertyTree
	}
}).mount("#selection")
