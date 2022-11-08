<template>
	<div class="mapmenu">
		<MenuToggleGroup v-if="isMobile()" :menus="menus"/>
		<Submenu ref="select" icon="url(icons/select.svg)">
			<LayerSelect/>
		</Submenu>
		<Submenu ref="settings" icon="url(icons/settings.svg)">
			<MapSettings/>
		</Submenu>
	</div>
</template>

<script>
import MenuToggleGroup from "./MenuToggleGroup.vue"
import Submenu from "./Submenu.vue"
import LayerSelect from "./LayerSelect.vue"
import MapSettings from "./MapSettings.vue"

export default {
	name: "MapMenu",
	components: {
		MenuToggleGroup,
		Submenu,
		LayerSelect,
		MapSettings
	},
	data() {
		return {
			menus: []
		}
	},
	props: {
		gap: String
	},
	mounted() {
		// Refs dont exist before mount
		this.menus = [
			this.$refs.select,
			this.$refs.settings
		]
	},
	inject: ["isMobile"]
}
</script>

<style>
.mapmenu {
	position: absolute;
	width: 100%;
	height: 0px;
	z-index: 1;
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