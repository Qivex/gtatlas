<template>
	<div class="mapsettings">
		<SettingItem captionID="icon_size">
			<IconSizeSelector :onconfirm="updateIconSize" :min="20" :initial="35" :max="50" :icons="['default','office','supplies-crate','target']"/>
		</SettingItem>
		<SettingItem captionID="language">
			<LanguageSelector :options="['en','de']"/>
		</SettingItem>
		<SettingItem captionID="map_style">
			<TilesetSelector :onselect="updateTileset" :options="['render','print','game']"/>
		</SettingItem>
		<SettingItem captionID="business_col">
			<BusinessColorSelector :onselect="updateBusinessColor" :colors="['#F79F7B','#E286BB','#EFEE97','#71A9AF','#A08CC1','#8DCEA7','#B5D6EA','#B29084','#008472','#D85575']"/>
		</SettingItem>
		<SettingItem captionID="keep_settings">
			<LocalStorageSelector/>
		</SettingItem>
	</div>
</template>


<script>
import SettingItem from "./SettingItem.vue"
import IconSizeSelector from "./IconSizeSelector.vue"
import LanguageSelector from "./LanguageSelector.vue"
import TilesetSelector from "./TilesetSelector.vue"
import BusinessColorSelector from "./BusinessColorSelector.vue"
import LocalStorageSelector from "./LocalStorageSelector.vue"

export default {
	name: "MapSettings",
	components: {
		SettingItem,
		IconSizeSelector,
		LanguageSelector,
		TilesetSelector,
		BusinessColorSelector,
		LocalStorageSelector
	},
	methods: {
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden"),
		updateIconSize(size) {
			this.getMap().updateIconSize(size)
		},
		updateTileset(name) {
			this.getMap().updateTileset(name)
		},
		updateBusinessColor(color) {
			this.getMap().updateBusinessColor(color)
		}
	},
	inject: ["getMap"]
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

@media (pointer: coarse) {
	.mapsettings {
		width: 100%;
	}
}
</style>