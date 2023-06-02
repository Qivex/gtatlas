<template>
	<div class="about">
		<Section titleID="test_title">
			<p>{{translate("test_string")}}</p>
		</Section>
		<Section titleID="test_title">
			{{translate("test_string")}}
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