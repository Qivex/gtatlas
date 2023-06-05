<template>
	<div class="about">
		<Section titleID="test_title" v-for="i in 10">
			<p>{{translate("test_string")}}</p>
		</Section>
	</div>
</template>


<script>
import Section from "./Section.vue"

export default {
	name: "About",
	components: {
		Section
	},
	inject: ["translate"]
}
</script>


<style>
@media (pointer: fine) {
	.about {
		position: absolute;
		top: var(--navbar-height, 0px);
		left: 0px;
		width: 100vw;
		height: calc(100vh - var(--navbar-height, 0px));
		transform: translateY(100vh);
	}
}
</style>