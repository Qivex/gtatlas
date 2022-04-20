// Fetch templates
let templateList = [""]
let body = document.querySelector("body")
// https://stackoverflow.com/questions/45285129
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await
await Promise.all(
	templateList.map(templateID => {
		return fetch(`data/templates/${templateID}.xml`)
			.then(res => res.text())
			.then(templateString => {
				let template = document.createElement("template")
				template.setAttribute("id", `${templateID}-template`)
				template.innerHTML = templateString
				body.appendChild(template)
			})
	})
)


// Define components
var Property = {
	name: "Property",
	template: "#property-template",
	props: {
		id: String,
		initial: Boolean,
		icon: String,
		onchange: Function
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
		cycle: function() {
			this.state = !this.state
			this.$parent.update()
		}
	}
}

var Group = {
	name: "Group",
	template: "#group-template",
	components: {
		Group,
		Property
	},
	props: {
		id: String,
		children: Array
	},
	data() {
		return {
			state: 0
		}
	},
	watch: {
		state: function() {
			// Chain up
			if (this.$parent !== this.$root) this.$parent.update()
			// Chain down
			if (this.state !== undefined) {
				this.$refs.childcomponents.forEach(child => child.state = this.state)
			}
		}
	},
	methods: {
		cycle: function() {
			switch(this.state) {
				case false:
					this.state = true
					break
				default:
					this.state = false
		},
		update: function() {
			let targetState
			this.$refs.childcomponents.forEach(child => {
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
			})
			this.state = targetState
		}
	},
	mounted: function() {
		this.update()
	}
}

var SelectionTree = {
	name: "SelectionTree",
	template: "#tree-template",
	components: {
		Group,
		Property
	},
	props: {
		structure: Object,
		onchange: Function
	},
}

export {Property, Group, SelectionTree}