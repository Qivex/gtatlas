<template>
	<div class="iconsize">
		<div class="sampleicons">
			<svg v-for="icon in icons" viewbox="0 0 128 128" :width="size" :height="size">
				<use :href="`icons/games/gta5icons.svg#icon-${icon.id}`" :color="icon.color"/>
			</svg>
		</div>
		<ConfirmSlider v-model="size" @change="onClickConfirm" :min="min" :max="max" :step="step"/>
	</div>
</template>


<script>
import ConfirmSlider from "./ConfirmSlider.vue"

export default {
	name: "IconSizeSelector",
	components: {
		ConfirmSlider
	},
	props: {
		min: Number,
		max: Number,
		step: Number,
		icons: Array
	},
	inject: ["translate", "currentIconSize"],
	data() {
		return {
			size: this.currentIconSize.toString()
		}
	},
	methods: {
		onClickConfirm() {
			// Live resize (also .lazy) is very laggy, so only do it once
			this.currentIconSize = this.size
		}
	}
}
</script>


<style>
.iconsize {
	width: 100%;
}

.iconsize .sampleicons {
	display: grid;
	grid-template: repeat(auto-fit, 48px) / repeat(auto-fit, 48px);
	place-items: center;
}

.iconsize .confirmslider {
	width: calc(100% - 2rem);
}
</style>