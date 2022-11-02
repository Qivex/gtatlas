<template>
	<div class="menu-togglebutton" :class="{expanded: expanded}" :style="style" @click.left="toggleMenu"></div>
</template>

<script>
export default {
	name: "MenuToggleButton",
	props: {
		menu: Object,	// Ref to menu which this toggles
		gap: String,
		index: Number,
		total: Number,
		orientation: String	// Used for rounded borders & icon rotation
	},
	computed: {
		mobileWidth() {
			// Subtract all the gaps (total+1) from 100%, divide remaining space equally:
			return `calc(calc(100vw - calc(${this.total + 1} * ${this.gap})) / ${this.total})`
		},
		mobileLeft () {
			// Add up all gaps and toggles to the left
			return `calc(calc(${this.index + 1} * ${this.gap}) + calc(${this.index} * ${this.mobileWidth}))`
		},
		style() {
			return {
				width: this.mobileWidth,
				left: this.mobileLeft,
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
	background-color: #F00;	/* TEMP */
	border-radius: 1rem 1rem 0 0;
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
	transform: rotate(90deg);
	width: 2.5rem;
	height: 2.5rem;
	background-image: url(icons/hide-arrow.svg);	/* Placeholder if no icon */
}

/* Replace icon with close-arrow when expanded */
.menu-togglebutton.expanded::after {
	transform: rotate(270deg);	/* TODO: Replace icon with arrow */
}
</style>