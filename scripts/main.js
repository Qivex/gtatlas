// Property Tree
import PropertyTree from "/scripts/propertytree.js"
import model from "/data/properties.js"	//TODO: fetch JSON instead

import "/scripts/mapinit.js"
import "/scripts/iconinit.js"

//setOrgColor("var(--gta-pink)")

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
