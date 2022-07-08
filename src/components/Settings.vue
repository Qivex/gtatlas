<template>
	<aside class="settings">
		<div class="settings-toggle" @click.left="toggleHidden"></div>
		<div class="settings-content">
			<slot/>
		</div>
	</aside>
</template>


<script>
export default {
	name: "Settings",
	methods: {
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden")
	}
}
</script>


<style>
.settings {
	position: absolute;
	top: 0px;
	right: 0px;
	width: 20rem;
	transform-origin: calc(100% - 30px) 30px;
	transition: transform 0.5s;
}

.settings-content {
	position: absolute;
	top: 60px;
	width: 100%;
	backdrop-filter: blur(5px);
	background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4));
}

.settings-toggle {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background: #000;
	background-image: url(icons/settings.svg);
}

.settings.hidden {
	transform: rotate(-90deg);
}
</style>