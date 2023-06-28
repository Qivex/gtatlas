<template>
	<NavBar class="camo">
		<a href="/" class="logolink">
			<img class="logo" :src="'icons/gtatlas.svg'"/>
		</a>
		<NavItem captionID="nav_select"   :onselect="toggleSelect"   :active="isSelectExpanded"/>
		<NavItem captionID="nav_settings" :onselect="toggleSettings" :active="isSettingsExpanded"/>
		<NavItem captionID="nav_about"    :onselect="toggleAbout"    :active="isAboutExpanded"/>
	</NavBar>
</template>


<script>
import NavBar from "./NavBar.vue"
import NavItem from "./NavItem.vue"

export default {
	name: "GTA5NavBar",
	components: {
		NavBar,
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
.logolink {
	display: contents;
}

.logo {
	margin: 0.5rem 1rem;
}
</style>