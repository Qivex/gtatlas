<template>
	<div class="lstoggle">
		<ToggleSwitch :initial="getUseLocalStorage()" :onchange="toggleUseLocalStorage"/>
		<p data-i18n="ls_allowed">{{translate("ls_allowed")}}</p>
		<MoreInfo>
			<p data-i18n="ls_moreinfo">{{translate("ls_moreinfo")}}</p>
		</MoreInfo>
	</div>
</template>


<script>
import ToggleSwitch from "./ToggleSwitch.vue"
import MoreInfo from "./MoreInfo.vue"

export default {
	name: "LocalStorageSelector",
	components: {
		ToggleSwitch,
		MoreInfo
	},
	data() {
		return {
			allowed: this.getUseLocalStorage()
		}
	},
	methods: {
		onselect() {
			this.allowed = !this.allowed
			this.toggleUseLocalStorage()
		},
		restoreDefaults() {
			window.localStorage.clear()
		}
	},
	inject: ["getUseLocalStorage", "toggleUseLocalStorage", "translate"]
}
</script>


<style>
.lstoggle {
	display: flex;
	height: 2rem;
	align-items: center;
	/*
	grid-template-columns: 3rem auto 2rem;
	place-items: center;
	place-content: center;
	*/
}

.lstoggle > p {
	margin-inline: 0.5rem;
}
</style>