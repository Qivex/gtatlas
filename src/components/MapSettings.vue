<template>
	<aside class="mapsettings">
		<div class="mapsettings-toggle" @click.left="toggleHidden"></div>
		<div class="mapsettings-content">
			<SettingItem captionID="icon_size">
				<IconSizeSelector :onconfirm="updateIconSize" :min="20" :initial="35" :max="50" :icons="['default','office','supplies-crate','target']"/>
			</SettingItem>
			<SettingItem captionID="language">
				<LanguageSelector :options="['en','de']"/>
			</SettingItem>
			<SettingItem captionID="map_style">
				<TilesetSelector :onselect="updateTileset" :options="['atlas','roadmap','satellite']"/>
			</SettingItem>
			<SettingItem captionID="business_col">
				<BusinessColorSelector :onselect="updateBusinessColor" :colors="['#F79F7B','#E286BB','#EFEE97','#71A9AF','#A08CC1','#8DCEA7','#B5D6EA','#B29084','#008472','#D85575']"/>
			</SettingItem>
		</div>
	</aside>
</template>


<script>
import SettingItem from "./SettingItem.vue"
import IconSizeSelector from "./IconSizeSelector.vue"
import LanguageSelector from "./LanguageSelector.vue"
import TilesetSelector from "./TilesetSelector.vue"
import BusinessColorSelector from "./BusinessColorSelector.vue"

export default {
	name: "MapSettings",
	components: {
		SettingItem,
		IconSizeSelector,
		LanguageSelector,
		TilesetSelector,
		BusinessColorSelector
	},
	props: {
		map: Object
	},
	methods: {
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden"),
		updateIconSize(size) {
			this.map.updateIconSize(size)
		},
		updateTileset(name) {
			this.map.updateTileset(name)
		},
		updateBusinessColor(color) {
			this.map.updateBusinessColor(color)
		}
	}
}
</script>


<style>
.mapsettings {
	position: absolute;
	top: 0px;
	right: 0px;
	width: 20rem;
	transform-origin: calc(100% - 30px) 30px;
	transition: transform 0.5s;
}

.mapsettings-content {
	position: absolute;
	top: 60px;
	width: 100%;
	backdrop-filter: blur(5px);
	background-color: rgba(0,0,0,0.5);
}

.mapsettings-toggle {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background: #000;
	background-image: url(icons/settings.svg);
}

.mapsettings.hidden {
	transform: rotate(-90deg);
}
</style>