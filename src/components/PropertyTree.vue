<template>
	<div class="propertytree">
		<Component :is="structure.children ? 'PropertyGroup' : 'Property'" v-bind="structure"/>
	</div>
</template>


<script>
import Property from "./Property.vue"
import PropertyGroup from "./PropertyGroup.vue"

export default {
	name: "PropertyTree",
	components: {
		Property,
		PropertyGroup
	},
	props: {
		structure: Object,
		onchange: Function
	},
	methods: {
		update() { console.log("Avoid this!") }
	},
	provide() {
		return {
			onchange: this.onchange
		}
	}
}
</script>

<style>
.propertytree {
	min-width: 300px;
}
</style>