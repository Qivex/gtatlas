<template>
	<div class="navitem pointer" :class="{active}" @click.left="onselect">
		<h3>{{translate(captionID)}}</h3>
	</div>
</template>


<script>
export default {
	name: "NavItem",
	props: {
		captionID: String,
		onselect: Function,
		active: Boolean
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
}

.navitem:hover {
	background-color: rgba(127,127,127,0.3);
}

.active h3 {
	text-shadow: 0px 0px 0.5rem #FFF;
}
</style>