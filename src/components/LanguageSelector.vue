<template>
	<div class="languages">
		<img v-for="lang in options" class="flagicon pointer" :class="{selected: lang === currentLanguage}" :src="`icons/flags/${lang}.svg`" @click.left="setLanguage(lang)" :alt="lang"/>
	</div>
</template>


<script>
export default {
	name: "LanguageSelector",
	props: {
		options: Array
	},
	inject: ["setLanguage", "currentLanguage"]
}
</script>


<style>
.languages {
	display: grid;
	grid-template-columns: repeat(auto-fit, 2rem);	/* grid-auto-flow: column */
	column-gap: 1rem;
	justify-items: center;
}

.flagicon {
	width: 2rem;
	border-radius: 1rem;
}

.flagicon.selected {
	outline: white solid 2px;
}
</style>