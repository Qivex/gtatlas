<template>
	<div class="submenu" :class="{expanded}">
		<slot/>
	</div>
</template>

<script>
export default {
	name: "Submenu",
	props: {
		icon: String
	},
	data() {
		return {
			expanded: false
		}
	},
	methods: {
		toggleExpanded() {
			this.expanded = !this.expanded
		}
	}
}
</script>

<style>
.submenu {
	position: absolute;
	transition: transform 0.5s;
}

@media (prefers-reduced-motion) {
	.submenu, .submenu > div {
		transition: transform 0s;
	}
}

/* Define background (not directly because of display:contents) */
.submenu > div {
	backdrop-filter: blur(5px);
	background-color: rgba(0,0,0,0.5);
	min-height: 100%;
}

@media (pointer: fine) {
	/* Enables content to set its own position */
	.submenu {
		display: contents;
	}

	/* On Desktop the child-div is transformed (because of display:contents) */
	.submenu > div {
		transition: transform 0.5s;
	}

	/* Submenu defines initial transform, but expanded is always back at origin */
	.submenu.expanded > div {
		transform: none;
	}
}

@media (pointer: coarse) {
	.submenu {
		top: 0px;	/* Avoid spacing from MenuToggleGroup */
		width: 100%;
		height: var(--expand-height);
		overflow-y: scroll;
	}

	.submenu.expanded {
		transform: translateY(calc(-1 * var(--expand-height)));
	}
}

/* TODO: Scrollbar
.layerselect-content::-webkit-scrollbar {
	width: 1rem;
}

.layerselect-content::-webkit-scrollbar-thumb {
	background: #788888;
	background-clip: padding-box;
	border: 0.3em solid transparent;
	border-radius: 1rem;
}*/
</style>