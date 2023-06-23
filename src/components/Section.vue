<template>
	<section>
		<h3 v-if="titleID">{{translate(titleID)}}</h3>
		<slot/>
	</section>
</template>


<script>
export default {
	name: "Section",
	props: {
		titleID: String
	},
	inject: ["translate"]
}
</script>


<style>
section {
	color: #fff;
	padding: 1rem;
	border-top: 1px solid #fff;
}

section:first-child {
	border: none;
}

section h3 {
	margin-bottom: 0.5rem;
}
</style>