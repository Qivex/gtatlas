<template>
	<div class="languages">
		<img v-for="lang in $availableLanguages" class="flagicon pointer" :class="{selected: lang === $lang.value}" :src="`icons/flags/${lang}.svg`" @click.left="$lang.value = lang" :alt="lang"/>
	</div>
</template>


<script>
export default {
	name: "LanguageSelector"
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