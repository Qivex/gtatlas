<template>
	<input type="range"
		:value="modelValue"
		@input="onSlide"
		@pointerup="onClick"
		class="confirmslider pointer"
		:class="{confirm: showConfirmButton}"
		:style="{'--percentage': percentage}"/>
</template>

<script>
export default {
	name: "ConfirmSlider",
	emits: ["input", "change", "update:modelValue"],
	props: {
		modelValue: String	// <input>-value is always String!
	},
	data() {
		return {
			hasValueChanged: false,
			showConfirmButton: false,
			percentage: ""
		}
	},
	methods: {
		onSlide(event) {
			this.hasValueChanged = true		// Value was changed -> Always show confirm button AFTER sliding
			this.showConfirmButton = false	// ... but not mid-slide
			// Emit input-Event & v-model immediately (only change-Event is delayed until confirmed!)
			let val = event.target.value
			this.$emit("input", val)	// Not propagated automatically!
			this.$emit('update:modelValue', val)
			// Update colored track
			this.updateColoredTrack(val)
		},
		onClick() {
			if (this.hasValueChanged) {
				// Prepare for confirm on next click (only if no slide happens)
				this.showConfirmButton = true
				this.hasValueChanged = false
			} else {
				// Confirm the change -> Emit delayed change-Event
				this.$emit("change", this.modelValue)
				this.showConfirmButton = false
			}
		},
		updateColoredTrack(value) {
			let val = parseFloat(value)
			let min = parseFloat(this.$el.min)
			let max = parseFloat(this.$el.max)
			// Note: Calculation isnt accurate, because the width of the slider isnt considered.
			// But the deviation is always small enough to be hidden behind the slider.
			this.percentage = `${(val - min) / (max - min) * 100}%`
		}
	},
	mounted() {
		// Initialize colored track
		this.updateColoredTrack(this.modelValue)
	}
}
</script>

<style>
.confirmslider {
	appearance: none;
	background: transparent;
	margin: 1rem;
}

/* Slider Track */
.confirmslider::-webkit-slider-runnable-track {
	height: 4px;
	border-radius: 2px;
	background: linear-gradient(to right, #999 var(--percentage), #666 var(--percentage));
}

.confirmslider::-moz-range-track {
	height: 4px;
	border-radius: 2px;
	background: linear-gradient(to right, #999 var(--percentage), #666 var(--percentage));
}

/* Slider Thumb */
.confirmslider::-webkit-slider-thumb {
	width: 1rem;
	height: 1rem;
	appearance: none;
	border-radius: 50%;
	background-color: #fff;
	filter: drop-shadow(0px 0.2rem 0.5rem #000);
	transition: transform 0.3s, background-color 0.3s;
	margin-top: calc(2px - 0.5rem);
}

.confirmslider::-moz-range-thumb {
	width: 1rem;
	height: 1rem;
	border: none;
	border-radius: 50%;
	background-color: #fff;
	filter: drop-shadow(0px 0.2rem 0.5rem #000);
	transition: transform 0.3s, background-color 0.3s;
}

/* Highlighted Slider Thumb */
.confirmslider::-webkit-slider-thumb:is(:focus,:active,:hover) {
	transform: scale(120%);
}

.confirmslider::-moz-range-thumb:is(:focus,:active,:hover) {
	transform: scale(120%);
}

/* Confirmation Slider Thumb */
.confirmslider.confirm::-webkit-slider-thumb {
	background-color: lime;
	background: no-repeat center / 80% url(/icons/check-true.svg) lime;
	transform: scale(200%);
}

.confirmslider.confirm::-moz-range-thumb {
	background-color: lime;
	background: no-repeat center / 80% url(/icons/check-true.svg) lime;
	transform: scale(200%);
}
</style>