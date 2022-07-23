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
	grid-template-columns: repeat(auto-fit, 2rem);
	column-gap: 1rem;
	justify-items: center;
}

.flagicon {
	cursor: pointer;
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
}
</style>