<template>
	<nav class="navbar">
		<img id="logo" :src="'icons/settings.svg'"/>
		<NavItem captionID="nav_select" :onselect="toggleSelect"/>
		<NavItem captionID="nav_settings" :onselect="toggleSettings"/>
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
	methods: {
		toggleSelect() {
			this.menus[0].toggleExpanded()
		},
		toggleSettings() {
			this.menus[1].toggleExpanded()
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
	box-sizing: border-box;
	border-bottom: 1px solid #fff;
}

.logo {
	margin: 4px;
}
</style>