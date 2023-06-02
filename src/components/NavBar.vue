<template>
	<nav>
		<slot/>
	</nav>
</template>

<script>
export default {
	name: "NavBar"
}
</script>

<style>
nav {
	display: flex;
	flex-direction: row;
	position: absolute;
	height: var(--navbar-height, 3rem);
	width: 100%;
	top: 0px;
	left: 0px;
	box-sizing: border-box;
	border-bottom: 1px solid #fff;
}
</style>