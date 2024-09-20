<template>
	<h2>Popup2</h2>
	<p>{{ `${text} ${number}` }}</p>
</template>

<script>
export default {
	props: {
		text: String,
		number: Number
	}
}
</script>