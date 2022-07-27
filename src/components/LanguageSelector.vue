<template>
	<div class="languages">
		<img v-for="lang in options" class="flagicon" :src="`icons/flags/${lang}.svg`" @click.left="updateLanguage(lang)" :alt="lang"/>
	</div>
</template>


<script>
export default {
	name: "LanguageSelector",
	props: {
		options: Array
	},
	inject: {
		updateLanguage: {
			from: "updateLanguage",
			default: function() {}
		}
	}
}
</script>


<style>
.languages {
	display: grid;
	grid-template-columns: repeat(auto-fit, 2rem);	/* grid-auto-flow: column */
	column-gap: 1rem;
	justify-items: center;
}

.languages img {
	width: 2rem;
	border-radius: 1rem;
	cursor: pointer;
}
</style>