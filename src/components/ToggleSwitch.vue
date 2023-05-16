<template>
	<div class="toggleswitch pointer" :class="{active: active}" @click.left="onclick"></div>
</template>


<script>
export default {
	name: "ToggleSwitch",
	props: {
		initial: {
			type: Boolean,
			default: false
		},
		onchange: Function
	},
	data() {
		return {
			active: this.initial
		}
	},
	methods: {
		onclick() {
			this.active = !this.active
			this.onchange?.(this.active)
		}
	}
}
</script>


<style>
.toggleswitch {
	width: 2.5rem;
	height: 1rem;
	background-color: red;
	border-color: red;
	border-radius: 1rem;
	border-style: solid;
	border-width: 4px;
}

.toggleswitch.active {
	background-color: lime;
	border-color: lime;
}

.toggleswitch::after {
	content: "";
	position: absolute;
	width: 1rem;
	height: 1rem;
	border-radius: 0.5rem;
	background-color: white;
	filter: drop-shadow(0px 0.2rem 0.5rem #000);
	transition: transform 0.3s;
}

@media (prefers-reduced-motion) {
	.toggleswitch::after {
		transition: transform 0s;
	}
}

.toggleswitch.active::after {
	transform: translateX(1.5rem);
}
</style>