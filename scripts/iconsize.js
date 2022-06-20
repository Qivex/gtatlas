// Fetch template
let template
await fetch("templates/iconsize.xml")
	.then(res => res.text())
	.then(templateString => template = templateString)

// Component
var IconSizeSelector = {
	name: "IconSizeSelector",
	template: template,
	props: {
		onconfirm: {
			type: Function,
			default: function() {}
		},
		initial: {
			type: Number,
			default: 35
		},
		min: Number,
		max: Number,
		icon: String
	},
	data() {
		return {
			size: this.initial
		}
	},
	methods: {
		onClickConfirm: function() {
			this.onconfirm(this.size)
		}
	}
}

export default IconSizeSelector