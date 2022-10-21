<template>
	<aside class="menu" :class="{hidden: hidden}">
		<div class="menu-toggle" :style="style" @click.left="toggleHidden"></div>
		<div class="menu-content">
			<slot/>
		</div>
	</aside>
</template>

<script>
export default {
	name: "Menu",
	props: {
		gap: String,
		index: Number,
		total: Number,
		visible: Boolean	// Some menus hidden state depends on desktop/mobile
	},
	data() {
		return {
			hidden: !this.visible
		}
	},
	computed: {
		mobileWidth() {
			// Subtract all the gaps (total+1) from 100%, divide remaining space equally:
			return `calc(calc(100% - calc(${this.total + 1} * ${this.gap})) / ${this.total})`
		},
		mobileLeft () {
			// Add up all gaps and toggles to the left
			return `calc(calc(${this.index + 1} * ${this.gap}) + calc(${this.index} * ${this.mobileWidth}))`
		},
		style() {
			// Use auto-positioned toggles on mobile
			if (this.isMobile()) {
				return {
					width: this.mobileWidth,
					left: this.mobileLeft,
				}
			}
			// Desktop toggle positions are different for each menu -> Define style there
			return null
		}
	},
	methods: {
		toggleHidden(event) {
			this.hidden = !this.hidden
		}
	},
	inject: ["isMobile"]
}
</script>

<style>
.menu {
	position: absolute;
	transition: transform 0.5s;
}

@media (prefers-reduced-motion) {
	.menu {
		transition: transform 0s;
	}
}

/* Todo: Stacking context is wrong, maybe this helps: https://coder-coder.com/z-index-isnt-working/ */
/* Todo: Icon + behaviour: Rotate arrow on desktop, change symbol to arrow on mobile */
.menu-toggle {
	position: absolute;
	background-color: #F00;
}

.menu-content {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	backdrop-filter: blur(5px);
	background-color: rgba(0,0,0,0.5);
}

@media (pointer: coarse) {
	.menu {
		width: 100%;
		height: 50%;
		bottom: 0px;
	}

	.menu.hidden {
		transform: translateY(100%);
	}

	.menu-toggle {
		height: 4rem;
		top: -4rem;
		border-radius: 1rem 1rem 0 0;
	}
}
</style>