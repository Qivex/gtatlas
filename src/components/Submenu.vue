<template>
	<div class="submenu" :class="{expanded: expanded}">
		<slot/>
	</div>
</template>

<script>
export default {
	name: "Submenu",
	data() {
		return {
			expanded: false
		}
	},
	methods: {
		toggleExpanded() {
			this.expanded = !this.expanded
		}
	},
	inject: ["isMobile"]
}
</script>

<style>
.submenu {
	position: absolute;
	transition: transform 0.5s;
}

@media (prefers-reduced-motion) {
	.submenu {
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
	.submenu {
		display: contents;	/* Enables content to set its own position */
	}
}

@media (pointer: coarse) {
	.submenu {
		width: 100vw;
		height: 50vh;
		overflow-y: scroll;
	}

	.submenu.expanded {
		transform: translateY(-50vh);
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