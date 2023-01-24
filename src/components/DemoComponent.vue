<template>
	<p>{{$translate("test-p", counter)}}</p>
	<button @click="counter++">{{$translate("test-but")}}</button>
</template>

<script>
export default {
	name: "DemoComponent",
	data() {
		return {
			counter: 1
		}
	}
}
</script>