//TODO Simplify into single component, the split is useless & coordination unnecessarily difficult

// Fetch template
let template
await fetch(`templates/colorpicker.xml`)
	.then(res => res.text())
	.then(templateString => template = templateString)

var ColorPicker = {
	name: "ColorPicker",
	template: template,
	props: {
		colors: Array,
		onchange: Function
	},
	data: function() {
		return {
			selectedIndex: 0
		}
	},
	computed: {
		pathRadius: function() {
			
		},
		circleRadius: function() {
			
		}
	},
	methods: {
		selectColor: function(index) {
			if (this.selectedIndex != index) {
				this.selectedIndex = index
				this.onchange(this.colors[index])
			}
		},
		getKeyPoints(index) {
			let part = index / this.colors.length
			return part + ';' + part
		},
		getRadius() {
			let n = this.colors.length
			const r = 48
			return r * Math.sin(Math.PI / n)
		}
	}
}

export default ColorPicker