<template>
	<div class="iconsize">
		<div class="sampleicons">
			<svg v-for="icon in icons" viewbox="0 0 128 128" :width="size" :height="size">
				<use :href="`#icon-${icon}`"/>
			</svg>
		</div>
		<input type="range" v-model="size" :min="min" :max="max"/>
		<button @click.left="onClickConfirm">{{translate("confirm")}}</button>
	</div>
</template>


<script>
export default {
	name: "IconSizeSelector",
	props: {
		onconfirm: {
			type: Function,
			default() {}
		},
		initial: Number,
		min: Number,
		max: Number,
		icons: Array
	},
	inject: ["translate"],
	data() {
		return {
			size: this.initial
		}
	},
	methods: {
		onClickConfirm() {
			// Live resize is very laggy, so only do it once
			this.onconfirm(this.size)
		}
	}
}
</script>


<style>
.iconsize {
	width: 100%;
}

.sampleicons {
	display: grid;
	grid-template: repeat(auto-fit, 50px) / repeat(auto-fit, 50px);
	/* grid-auto-flow: column;
	grid-template-rows: 50px; */
	place-items: center;
}
</style>