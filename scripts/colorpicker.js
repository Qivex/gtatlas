//TODO Simplify into single component, the split is useless & coordination unnecessarily difficult

// Fetch templates
let templateList = ["coloroption", "colorpicker"]
let templates = {}
// https://stackoverflow.com/questions/45285129
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await
await Promise.all(
	templateList.map(templateID => {
		return fetch(`templates/${templateID}.xml`)
			.then(res => res.text())
			.then(templateString => templates[templateID] = templateString)
	})
)

var ColorOption = {
	name: "ColorOption",
	template: templates["coloroption"],
	inject: {
		onselect: {
			from: "updatehandler",
			default: function() {}
		}
	},
	props: {
		color: String
	},
	data: function() {
		return {
			selected: false
		}
	},
	methods: {
		select: function() {
			if (!this.selected) {
				// TODO: deselect all other colors like: this.$parent.$refs.childcomponents.forEach(child => child.deselect())
				this.selected = true
				this.onselect(this.color)
			}
		},
		deselect: function() {
			this.selected = false
		}
	}
}

var ColorPicker = {
	name: "ColorPicker",
	template: templates["colorpicker"],
	props: {
		colors: Array,
		onchange: Function
	},
	data: function() {
		return {
			colorIndex: 0
		}
	},
	provide() {
		return {
			updatehandler: this.onchange
		}
	},
	methods: {
		selectColor: function(index) {
			this.colorIndex = index	// TODO check valid
			// TODO Select this color option
		},
		deselectAll: function() {
			this.$refs.coloroptions.forEach(color => color.deselect())
		}
	}
}

export default ColorPicker