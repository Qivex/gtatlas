<template>
	<GTAMap ref="map" id="gtamap"/>
	<Selection>
		<PropertyTree :structure="structure" :onchange="setLayerVisibility"/>
	</Selection>
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
import Selection from "./components/Selection.vue"
import Settings from "./components/Settings.vue"
import IconSizeSelector from "./components/IconSizeSelector.vue"

import structure from "./data/treestructure.js"

export default {
	name: "App",
	components: {
		GTAMap,
		Selection,
		PropertyTree,
		Settings,
		IconSizeSelector
	},
	data() {
		return {
			structure
		}
	},
	methods: {
		setLayerVisibility: function(id, visibility) {
			this.$refs.map.setLayerVisibility(id, visibility)
		}
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