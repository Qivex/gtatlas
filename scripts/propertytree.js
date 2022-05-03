// Fetch templates
let templateList = ["property", "propertygroup", "propertytree"]
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


// Define components
var Property = {
	name: "Property",
	template: templates["property"],
	inject: {
		onchange: {
			from: "updatehandler",
			default: function() {}
		}
	},
	props: {
		id: String,
		initial: Boolean,
		icon: String
	},
	data() {
		return {
			state: this.initial
		}
	},
	watch: {
		state: function() {
			this.onchange(this.id, this.state)
		}
	},
	methods: {
		cycleState: function() {
			this.state = !this.state
			this.$parent.update()	// Can't do this in watch: infinite update loop
		}
	}
}

var PropertyGroup = {
	name: "PropertyGroup",
	template: templates["propertygroup"],
	components: {
		Property
	},
	props: {
		id: String,
		children: Array
	},
	data() {
		return {
			state: false
		}
	},
	watch: {
		state: function() {
			// Chain down
			if (this.state !== undefined) {	// Don't update children to undefined
				this.$refs.childcomponents.forEach(child => child.state = this.state)
			}
		}
	},
	methods: {
		cycleState: function() {
			switch(this.state) {
				case false:
					this.state = true
					break
				default:
					this.state = false
			}
			this.$parent.update()
		},
		update: function() {
			let targetState
			for (let child of this.$refs.childcomponents) {
				// Skip if any child is already undefined
				if (child.state === undefined) {
					targetState = undefined
					break
				}
				// Init first value
				if (targetState === undefined) {
					targetState = child.state
					continue
				}
				// Undefined if any child doesn't match
				if (child.state !== targetState) {
					targetState = undefined
					break
				}
			}
			this.state = targetState
			// Chain up
			this.$parent.update()
		}
	},
	mounted: function() {
		this.update()
	}
}

var PropertyTree = {
	name: "PropertyTree",
	template: templates["propertytree"],
	components: {
		Property,
		PropertyGroup
	},
	props: {
		structure: Object,
		onchange: Function
	},
	methods: {
		update: function() { console.log("Avoid this!") }
	},
	provide() {
		return {
			updatehandler: this.onchange
		}
	}
}

export default PropertyTree