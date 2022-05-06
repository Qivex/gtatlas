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
		colors: Array,	// TODO: Flawed calculation if length=1
		gapRatio: Number,
		onchange: Function
	},
	data() {
		return {
			selectedIndex: 0,
			totalSize: 100	// Inccurate positioning if too small (like 1)!
		}
	},
	computed: {
		ratio() {
			// Ratio of inner circle to outer circle.
			// Using regular polygon to calculate:
			// ratio = half side length / circumradius
			return Math.sin(Math.PI / this.colors.length)
		},
		pathRadius() {
			// Split total size according to ratio:
			// totalSize = 2*(pathRadius + circleRadius)
			return this.totalSize / (2*this.ratio + 2)
		},
		circleRadius() {
			// Apply calculated ratio -> largest possible
			let r = this.pathRadius * this.ratio
			// Apply gap
			if (this.gapRatio) {
				r *= 1 - this.gapRatio
			}
			return r
		},
		pathCommand() {
			// Shortcuts
			let s = this.totalSize
			let r1 = this.pathRadius
			let r2 = this.circleRadius
			// Split into 2 halfs arcs of circle (relative 0,0 isnt drawn)
			return `M${s/2},${r2} a${r1},${r1} 0,1,1 0,${2*r1} a${r1},${r1} 0,1,1 0,${-2*r1}`
		}
	},
	methods: {
		selectColor(index) {
			if (this.selectedIndex != index) {
				this.selectedIndex = index
				this.onchange(this.colors[index])
			}
		},
		keyPoints(index) {
			// Hack to position element at any position of arbitrary path:
			// animateMotion with calcMode=discrete and static keyPoints for 0;1
			let part = index / this.colors.length
			return part + ';' + part
		}
	}
}

export default ColorPicker