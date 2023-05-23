<template>
	<nav class="navbar">
		<img id="logo" :src="'icons/settings.svg'"/><!-- TODO placeholder -->
		<NavItem captionID="nav_select"   :onselect="toggleSelect"   :active="isSelectExpanded"/>
		<NavItem captionID="nav_settings" :onselect="toggleSettings" :active="isSettingsExpanded"/>
		<NavItem captionID="nav_about"    :onselect="toggleAbout"    :active="isAboutExpanded"/>
	</nav>
</template>


<script>
import NavItem from "./NavItem.vue"

export default {
	name: "NavBar",
	components: {
		NavItem
	},
	props: {
		menus: Array
	},
	computed: {
		menuSelect() {
			return this.menus[0]
		},
		menuSettings() {
			return this.menus[1]
		},
		menuAbout() {
			return this.menus[2]
		},
		isSelectExpanded() {
			return !!this.menuSelect?.expanded
		},
		isSettingsExpanded() {
			return !!this.menuSettings?.expanded
		},
		isAboutExpanded() {
			return !!this.menuAbout?.expanded
		},
	},
	methods: {
		toggleSelect() {
			this.menuSelect.toggleExpanded()
		},
		toggleSettings() {
			this.menuSettings.toggleExpanded()
		},
		toggleAbout() {
			this.menuAbout.toggleExpanded()
			// Update location (Todo: Should this also happen on mobile?)
			if (this.menuAbout.expanded) {
				window.history.pushState(null, "", "/about")
			} else {
				window.history.back()
			}
		}
	}
}
</script>


<style>
.navbar {
	display: flex;
	flex-direction: row;
	position: absolute;
	height: var(--navbar-height);
	width: 100%;
	top: 0px;
	left: 0px;
	background-color: #222;
	background-image: url(/icons/patterns/camo.svg);
	box-sizing: border-box;
	border-bottom: 1px solid #fff;
}

#logo {
	margin: 4px;
}
</style>