<template>
	<div class="mapmenu">
		<MenuToggleGroup v-if="isTouchDevice" :menus="menus"/>
		<GTA5NavBar v-else :menus="menus"/>
		<Submenu ref="select" icon="url(/icons/select.svg)">
			<LayerSelect/>
		</Submenu>
		<Submenu ref="settings" icon="url(/icons/settings.svg)">
			<MapSettings/>
		</Submenu>
		<Submenu ref="about" icon="url(/icons/info.svg)">
			<About/>
		</Submenu>
	</div>
</template>

<script>
import MenuToggleGroup from "./MenuToggleGroup.vue"
import GTA5NavBar from "./GTA5NavBar.vue"
import Submenu from "./Submenu.vue"
import LayerSelect from "./LayerSelect.vue"
import MapSettings from "./MapSettings.vue"
import About from "./About.vue"

export default {
	name: "MapMenu",
	components: {
		MenuToggleGroup,
		GTA5NavBar,
		Submenu,
		LayerSelect,
		MapSettings,
		About
	},
	props: {
		gap: String
	},
	inject: ["isTouchDevice"],
	data() {
		return {
			menus: []
		}
	},
	mounted() {
		// Refs dont exist before mount
		this.menus = [
			this.$refs.select,
			this.$refs.settings,
			this.$refs.about
		]
		// Method call instead of initial state (data) to show animation -> Gives indication that menus can be toggled
		if (!this.isTouchDevice) {
			this.$refs.select.toggleExpanded()
		}
	}
}
</script>

<style>
.mapmenu {
	position: absolute;
	width: 100%;
	height: 0px;
	z-index: 1;
	--navbar-height: 3rem;
	--toggle-height: 4rem;
	--toggle-gap: 1rem;
	--expand-height: 50vh;
}

@media (pointer: fine) {
	.mapmenu {
		top: 0px;
	}
}

@media (pointer: coarse) {
	.mapmenu {
		bottom: 0px;
	}
}
</style>