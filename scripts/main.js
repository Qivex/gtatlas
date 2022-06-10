import PropertyTree from "/scripts/propertytree.js"
import model from "/data/properties.js"	//TODO: fetch JSON instead

import Popup from "/scripts/popup.js"

import {gtamap, setMapLayer, setOrgColor} from "/scripts/mapinit.js"
import "/scripts/iconinit.js"

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

Vue.createApp({
	data() {
		return {
			type: "SpecialPopup",
			data: {
				title: "Interactive Popup"
			}
		}
	},
	methods: {
		updatePopup: function(type, data) {
			this.type = type
			this.data = data
		}
	},
	components: {
		Popup
	}
}).mount("#popup")
