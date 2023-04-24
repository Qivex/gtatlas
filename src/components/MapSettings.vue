<template>
	<div class="mapsettings">
		<Section titleID="icon_size">
			<IconSizeSelector :onconfirm="setIconSize" :min="20" :initial="35" :max="50" :icons="['default','office','supplies-crate','target']"/>
		</Section>
		<Section titleID="language">
			<LanguageSelector/>
		</Section>
		<Section titleID="map_style">
			<TilesetSelector :onselect="setTileset" :options="['render','print','game']"/>
		</Section>
		<Section titleID="business_col">
			<BusinessColorSelector :onselect="setIconColor" :colors="['#F79F7B','#E286BB','#EFEE97','#71A9AF','#A08CC1','#8DCEA7','#B5D6EA','#B29084','#008472','#D85575']"/>
		</Section>
		<Section titleID="keep_settings">
			<LocalStorageSelector v-if="isLocalStorageEnabled"/>
			<p v-else>{{translate("ls_blocked")}}</p>
		</Section>
	</div>
</template>


<script>
import Section from "./Section.vue"
import IconSizeSelector from "./IconSizeSelector.vue"
import LanguageSelector from "./LanguageSelector.vue"
import TilesetSelector from "./TilesetSelector.vue"
import BusinessColorSelector from "./BusinessColorSelector.vue"
import LocalStorageSelector from "./LocalStorageSelector.vue"

export default {
	name: "MapSettings",
	components: {
		Section,
		IconSizeSelector,
		LanguageSelector,
		TilesetSelector,
		BusinessColorSelector,
		LocalStorageSelector
	},
	inject: ["translate", "getMap", "isLocalStorageEnabled"],
	methods: {
		setTileset(name) {
			this.getMap().setTileset(name)
		},
		setIconSize(size) {
			this.getMap().setIconSize(size)
		},
		setIconColor(color) {
			this.getMap().setIconColor(color)
		}
	}
}
</script>


<style>
@media (pointer: fine) {
	.mapsettings {
		position: absolute;
		top: var(--navbar-height);
		right: 0px;
		width: 20rem;
		transform: translateX(100%);
	}
}
</style>