<template>
	<div class="settingitem">
		<p>{{caption}}</p>
		<slot/>
	</div>
</template>


<script>
export default {
	name: "SettingItem",
	props: {
		caption: String
	}
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

.settingitem p {
	margin-bottom: 0.5rem;
}
</style>