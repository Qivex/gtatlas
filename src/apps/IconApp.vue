<template>
	<div v-if="currentIcon" class="icon-single">
		<svg>
			<use :href="toHREF(currentIcon)"/>
		</svg>
		<div class="icon-menu">
			<p>{{currentIcon}}</p>
			<img src="icons/download.svg" @click.left="openSaveDialog"/>
			<img src="icons/close.svg" @click.left="closeIcon"/>
			<!-- Todo: Embed as SVG -->
		</div>
		<dialog class="save-dialog" ref="pngdialog">
			<p>Save as PNG</p>
			<input type="range" min="4" max="12" v-model="sizeStep" style="width:16rem"/>
			<p>{{pngSize + "x" + pngSize}}</p>
			<button @click.left="savePNG">Save As...</button>
			<button @click.left="closeSaveDialog">Cancel</button>
		</dialog>
	</div>
	<div v-else class="icon-overview" :style="{'--colcount': columnCount}">
		<svg v-for="id in iconIDs">
			<use :href="toHREF(id)" @click.left="selectIcon(id)"/>
		</svg>
	</div>
	<div id="mapicons"></div>
</template>


<script>
export default {
	name: "IconApp",
	data() {
		return {
			iconIDs: [],
			currentIcon: undefined,
			columnCount: 8,
			sizeStep: 7
		}
	},
	computed: {
		pngSize() {
			return Math.pow(2, this.sizeStep)
		}
	},
	methods: {
		selectIcon(id) {
			this.currentIcon = id
		},
		closeIcon() {
			this.currentIcon = undefined
		},
		adjustGrid() {
			// Shortcuts
			let w = window.innerWidth
			let h = window.innerHeight
			let n = this.iconIDs.length
			// Equally distribute entire area to square icons
			let totalArea = w * h
			let iconArea = totalArea / n
			let iconEdge = Math.sqrt(iconArea)
			this.columnCount = Math.ceil(w / iconEdge)
		},
		openSaveDialog() {
			this.$refs.pngdialog.showModal()
		},
		closeSaveDialog() {
			this.$refs.pngdialog.close()
		},
		savePNG() {
			// Close dialog
			this.closeSaveDialog()
			// Create canvas of pngSize
			// Draw SVG
			// Create Data-URL
			// Open Save-prompt
		},
		toHREF(id) {
			return "#icon-" + id
		}
	},
	mounted() {
		// Get all icons
		fetch("icons/gtaicons.svg")
			.then(res => res.text())
			.then(data => {
				document.getElementById("mapicons").innerHTML = data
				document.querySelectorAll("#icons symbol").forEach(el => this.iconIDs.push(el.id.replace("icon-", "")))
				this.adjustGrid()
			})
		
		// Update on resize
		window.addEventListener("resize", this.adjustGrid)
	}
}
</script>


<style>
body {
	position: fixed; /* Fixes shifting viewport on mobile (https://stackoverflow.com/a/68359419) */
	height: 100%;
	width: 100%;
	margin: 0px;
	padding: 0px;
	background-image: url(icons/pattern-checker.svg);
	background-size: 24px 24px;
	color: #fff;	/* Initial org-color for icons (defaults to black) */
	font-family: arial;
}

p,h1,h2,h3,h4,h5,h6 {
	margin: 0px;
	color: #fff;
	font-weight: normal;
}

.icon-single {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template: 1fr 3rem / 100%;
	align-items: center;
	justify-items: center;
}

.icon-menu {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.icon-menu * {
	margin-inline: 0.5rem;
}

.icon-menu img {
	width: 2rem;
	height: 2rem;
}

.icon-overview {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(var(--colcount), 1fr);
}

.save-dialog {
	background-color: #222;
	border: 1px solid #fff;
	padding: 1rem;
}

.save-dialog::backdrop {
	background: rgba(0,0,0,0.5);
}

/* Fix for orange outline of dialog-input */
.save-dialog *:focus {
	outline: none;
}

svg {
	width: 100%;
	height: 100%;
}

@media (any-pointer: fine) {
	.icon-overview use {
		cursor: pointer;
	}
}

/* SVG symbols */
#mapicons {
	display: none;
}
</style>