<template>
	<div class="property" tabindex="0">
		<input type="checkbox" :id="id" v-model="state" @click.left="cycleState"/>
		<div class="styled-checkbox" @click.left="cycleState"></div>
		<p>temp-{{id}}</p>
		<svg class="preview-icon" viewbox="0 0 128 128">
			<use :href="`#icon-${icon}`"/>
		</svg>
	</div>
</template>


<script>
export default {
	name: "Property",
	inject: {
		onchange: {
			from: "updatehandler",
			default: function() {}
		}
	},
	props: {
		id: String,
		initial: Boolean,
		icon: String
	},
	data() {
		return {
			state: !!this.initial
		}
	},
	watch: {
		state: function() {
			this.onchange?.(this.id, this.state)
		}
	},
	methods: {
		cycleState: function() {
			this.state = !this.state
			this.$parent.update?.()	// Can't do this in watch: infinite update loop
		}
	}
}
</script>


<style>
/* Basic alignment */
.property {
	display: flex;
	align-items: center;
	width: 100%;
	height: 38px;
}

/* Hover state */
@media (hover: hover) {
	.property:is(:hover,:focus,:active) {
		background: linear-gradient(90deg, #F0F0F0, #C4C4C4);
	}

	.property:is(:hover,:focus,:active) > p {
		color: black;
	}

	/* Invert to remain visible */
	.property:is(:hover,:focus,:active) > .styled-checkbox {
		filter: invert(1);
	}
}

/* Corresponding map blip */
.preview-icon {
	position: absolute;
	right: 10px;
	width: 30px;
	height: 30px;
	color: var(--business-color);
}

/* Hide the real checkbox ... */
.property input {
	display: none;
}

/* ... and use a fake div for styling */
.property .styled-checkbox {
	width: 18px;
	height: 18px;
	margin: 0px 10px;
	cursor: pointer;
	background-color: white;
}

/* Show checkmark if selected */
.property input:checked + .styled-checkbox {
	background-image: url(icons/check-true.svg);
}
</style>