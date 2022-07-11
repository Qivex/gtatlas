<template>
	<GTAMap ref="map" id="gtamap"/>
	<LayerSelect :map="map"/>
	<Settings>
		<!-- TODO: SettingsItem for spacing, horizontal line etc -->
		<IconSizeSelector :min="20" :initial="35" :max="50" :icons="['default','office','supplies-crate','target']"/>
		<!--
		<SettingLanguage/>
		<SettingTileSet/>
		<SettingBusinessColor/>
		-->
	</Settings>
	<div id="mapicons"></div>
</template>


<script>
import PropertyTree from "./components/PropertyTree.vue"
import GTAMap from "./components/GTAMap.vue"
import LayerSelect from "./components/LayerSelect.vue"
import Settings from "./components/Settings.vue"
import IconSizeSelector from "./components/IconSizeSelector.vue"

export default {
	name: "App",
	components: {
		GTAMap,
		LayerSelect,
		PropertyTree,
		Settings,
		IconSizeSelector
	},
	data() {
		return {
			map: undefined	// Ref doesn't exist yet
		}
	},
	mounted() {
		// Update ref to map (for all components using it)
		this.map = this.$refs.map
	}
}


</script>


<style>
body {
	position: fixed; /* Fixes shifting viewport on mobile (https://stackoverflow.com/a/68359419) */
	height: 100%;
	width: 100%;
	margin: 0px;
	padding: 0px;
	color: #fff;	/* Initial org-color for icons (defaults to black) */
}

/* SVG document with all icons as <symbol> */
#mapicons {
	display: none;
}
</style>