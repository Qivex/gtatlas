<template>
	<div class="languages">
		<img v-for="lang in availableLanguages" class="flagicon pointer" :class="{selected: lang === currentLanguage}" :src="`icons/flags/${lang}.svg`" @click.left="currentLanguage = lang" :alt="lang"/>
	</div>
</template>


<script>
export default {
	name: "LanguageSelector",
	inject:	["availableLanguages", "currentLanguage"]
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
</style>