<template>
	<h2>{{ translate("nav_settings") }}</h2>
	<LanguageSelector/>
</template>

<script>
import LanguageSelector from "../LanguageSelector.vue"

export default {
	components: {
		LanguageSelector
	},
	inject: ["translate"]
}
</script>