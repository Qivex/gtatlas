<template>
	<div class="lstoggle">
		<ToggleSwitch :initial="isLSAllowed()" :onchange="setLSAllowed"/>
		<p>{{translate("ls_allowed")}}</p>
		<MoreInfo>
			<p>{{translate("ls_moreinfo")}}</p>
			<br/>
			<a href="https://www.w3schools.com/html/html5_webstorage.asp" target="_blank" rel="noopener noreferrer">{{translate("ls_link")}}</a>
		</MoreInfo>
	</div>
</template>


<script>
import ToggleSwitch from "./ToggleSwitch.vue"
import MoreInfo from "./MoreInfo.vue"

import { setLSAllowed, isLSAllowed } from "../tools/config.js"

export default {
	name: "LocalStorageSelector",
	components: {
		ToggleSwitch,
		MoreInfo
	},
	methods: {
		setLSAllowed,
		isLSAllowed
	},
	inject: ["translate"]
}
</script>


<style>
.lstoggle {
	display: flex;
	height: 2rem;
	align-items: center;
}

.lstoggle > p {
	margin-inline: 0.5rem;
}
</style>