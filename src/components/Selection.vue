<template>
	<aside class="selection">
		<div class="selection-toggle" @click.left="toggleHidden"></div>
		<div class="selection-content">
			<slot/>
		</div>
	</aside>
</template>


<script>
export default {
	name: "Selection",
	methods: {
		toggleHidden: event => event.target.parentNode.classList.toggle("hidden")
	}
}
</script>


<style>
.selection {
	position: absolute;
	transition: transform 0.5s;
}

@media (prefers-reduced-animation) {
	.selection {
		position: absolute;
		left: 0px;
		transition: transform 0s;
	}
}

.selection-content {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	backdrop-filter: blur(5px);
	background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4));
}

.selection-toggle {
	position: absolute;
	background-color: #000;
}

.selection-toggle::after {
	position: absolute;
	width: 2rem;
	height: 2rem;
	content: "";
	background-image: url(icons/hide-arrow.svg);
}

/* Desktop */
@media (pointer: fine) {
	.selection {
		width: 20rem;
		height: 100%;
		top: 0px;
	}

	.selection.hidden {
		transform: translateX(-100%);
	}

	.selection-toggle {
		width: 2rem;
		height: 4rem;
		top: calc(50% - 2rem);
		left: 100%;
		cursor: pointer;	/* https://stackoverflow.com/questions/45049873 */
		border-radius: 0 1rem 1rem 0;
	}

	.selection-toggle::after {
		top: 1rem;
	}

	.hidden >.selection-toggle::after {
		transform: rotate(180deg);
	}
}

/* Mobile */
@media (pointer: coarse) {
	@media (orientation: portrait) {
		.selection {
			width: 100%;
			height: 50%;
			bottom: 0px;
		}

		.selection.hidden {
			transform: translateY(100%);
		}

		.selection-toggle {
			width: 8rem;
			height: 4rem;
			top: -4rem;
			left: calc(50% - 4rem);
			border-radius: 1rem 1rem 0 0;
		}

		.selection-toggle::after {
			top: 1rem;
			left: 3rem;
			transform: rotate(-90deg);
		}

		.hidden >.selection-toggle::after {
			transform: rotate(90deg);
		}
	}

	@media (orientation: landscape) {

	}
}
</style>