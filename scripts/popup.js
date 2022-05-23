// Fetch templates
let templateList = ["base", "generic", "special"]
let templates = {}
// https://stackoverflow.com/questions/45285129
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await
await Promise.all(
	templateList.map(templateID => {
		return fetch(`templates/popups/${templateID}.xml`)
			.then(res => res.text())
			.then(templateString => templates[templateID] = templateString)
	})
)

var GenericPopup = {
	name: "GenericPopup",
	template: templates["generic"],
	props: {
		title: String,
		text: String
	}
}

// Test
var SpecialPopup = {
	name: "SpecialPopup",
	template: templates["special"],
	props: {
		title: String
	},
	methods: {
		onclick() {
			console.log("Interactive Popup")
		}
	}
}

var Popup = {
	name: Popup,
	template: templates["base"],
	props: {
		type: String,
		data: Object
	},
	components: {
		GenericPopup,
		SpecialPopup
	}
}

export default Popup