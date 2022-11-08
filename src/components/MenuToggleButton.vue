<template>
	<div class="menu-togglebutton" :class="{expanded: expanded}" :style="style" @click.left="toggleMenu"></div>
</template>

<script>
export default {
	name: "MenuToggleButton",
	props: {
		menu: Object,	// Ref to menu which this toggles
		icon: String,
		gap: String,
		index: Number,
		total: Number
	},
	computed: {
		width() {
			// Subtract all the gaps (total+1) from 100%, divide remaining space equally:
			return `calc(calc(100vw - calc(${this.total + 1} * ${this.gap})) / ${this.total})`
		},
		left() {
			// Add up all gaps and toggles to the left
			return `calc(calc(${this.index + 1} * ${this.gap}) + calc(${this.index} * ${this.width}))`
		},
		style() {
			return {
				width: this.width,
				left: this.left,
				"--icon": this.icon	// Set var (cant access ::after directly)
			}
		},
		expanded() {
			return this.menu.expanded
		}
	},
	methods: {
		toggleMenu() {
			this.menu.toggleExpanded()
		}
	},
	inject: ["isMobile"]
}
</script>

<style>
.menu-togglebutton {
	position: absolute;
	bottom: 0px;
	height: 4rem;
	background-color: #222;
	box-shadow: 0 0 20px 5px #222;
	border-radius: 1.5rem 1.5rem 0 0;
	transition: transform 0.5s;
	/* Centers icon: */
	display: flex;
	place-content: center;
	place-items: center;
}

@media (prefers-reduced-motion) {
	.menu-togglebutton {
		transition: transform 0s;
	}
}

/* Move just like the menu */
.menu-togglebutton.expanded {
	transform: translateY(-50vh);
}

/* Icon */
.menu-togglebutton::after {
	position: absolute;	/* Doesnt show up without */
	content: "";
	width: 2.5rem;
	height: 2.5rem;
	background-image: var(--icon, url(icons/hide.svg));	/* Fallback if no icon */
}

/* Replace icon with close-arrow when expanded */
.menu-togglebutton.expanded::after {
	background-image: url(icons/hide.svg);
	transform: rotate(180deg);
}
</style>