<template>
	<div class="navitem" :class="{active}" @click.left="onselect">
		<h3>{{$translate(captionID)}}</h3>
	</div>
</template>


<script>
export default {
	name: "NavItem",
	props: {
		captionID: String,
		onselect: Function,
		active: Boolean
	}
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

.active h3 {
	text-shadow: 0px 0px 0.5rem #FFF;
}
</style>