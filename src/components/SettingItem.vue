<template>
	<div class="settingitem">
		<h3 :data-i18n="captionID">{{translate(captionID)}}</h3>
		<slot/>
	</div>
</template>


<script>
export default {
	name: "SettingItem",
	props: {
		captionID: String
	},
	inject: ["translate"]
}
</script>


<style>
.settingitem {
	color: #fff;
	padding: 1rem;
	border-top: 1px solid #fff;
}

.settingitem:first-child {
	border: none;
}

.settingitem h3 {
	margin-bottom: 0.5rem;
}
</style>