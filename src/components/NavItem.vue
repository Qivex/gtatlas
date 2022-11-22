<template>
	<div class="navitem" @click.left="onselect">
		<h3 :data-i18n="captionID">{{translate(captionID)}}</h3>
	</div>
</template>


<script>
export default {
	name: "NavItem",
	props: {
		captionID: String,
		onselect: Function
	},
	inject: ["translate"]
}
</script>


<style>
.navitem {
	display: flex;
	height: 100%;
	padding-inline: 1rem;
	place-items: center;
	cursor: pointer;
}

.navitem:hover {
	background-color: #333;
}
</style>