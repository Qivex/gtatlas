<template>
	<DemoComponent/>
	<select v-model="$lang.value">
		<option v-for="lang in $availableLanguages" :key="lang" :value="lang">{{lang}}</option>
	</select>
</template>

<script>
import DemoComponent from "./DemoComponent.vue"

export default {
	components: {
		DemoComponent
	},
	created() {
		this.$lang.value = "en"
	}
}
</script>