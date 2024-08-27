<template>
	<div v-if="currentIcon" class="icon-single">
		<svg id="svg">
			<use :href="toHREF(currentIcon)" :color="color"/>
		</svg>
		<div class="icon-menu">
			<p>{{currentIcon}}</p>
			<div class="colorpick" @click.left="$refs.colorpick.click()">
				<input ref="colorpick" type="color" v-model="color"/>
			</div>
			<img src="/icons/download.svg" @click.left="openSaveDialog"/>
			<img src="/icons/close.svg" @click.left="closeIcon"/>
		</div>
		<dialog class="save-dialog" ref="pngdialog">
			<h2>Save as PNG</h2>
			<section>
				<p>Resolution: {{pngSize + "x" + pngSize}}</p>
				<input type="range" min="4" max="11" v-model="sizeStep" style="width:16rem"/>
			</section>
			<button @click.left="savePNG">Save</button>
			<button @click.left="closeSaveDialog">Cancel</button>
		</dialog>
	</div>
	<div v-else class="icon-overview" :style="{'--colcount': columnCount}">
		<svg v-for="id in iconIDs">
			<use class="pointer" :href="toHREF(id)" @click.left="selectIcon(id)" :color="color"/>
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
			sizeStep: 7,
			color: "#F0F0F0",
			svgData: ""
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
			this.closeSaveDialog()
			// Create canvas
			let canvas = new OffscreenCanvas(this.pngSize, this.pngSize)
			// Include entire SVG source (otherwise <use> wont resolve :/)
			let wrapper = document.createElement("div")
			wrapper.innerHTML = this.svgData
			let svg = wrapper.firstElementChild
			// Use only the selected icon
			let use = document.createElement("use")
			use.setAttribute("href", this.toHREF(this.currentIcon))
			use.setAttribute("color", this.color)	// Would be black without this
			svg.appendChild(use)
			// SVG as Blob
			let svgBlob = new Blob([svg.outerHTML], {type: "image/svg+xml;charset=utf-8"})
			// Draw on canvas as image
			let img = new Image()
			img.src = URL.createObjectURL(svgBlob)
			img.onload = () => {
				let ctx = canvas.getContext("2d")
				ctx.drawImage(img, 0, 0, this.pngSize, this.pngSize)
				// Convert canvas to PNG
				canvas.convertToBlob().then(pngBlob => {
					// Hack to start download: Temporary hidden <a>
					let link = document.createElement("a")
					link.download = this.currentIcon + ".png"
					link.href = URL.createObjectURL(pngBlob)
					link.click()
				})
			}
		},
		toHREF(id) {
			return "#icon-" + id
		}
	},
	mounted() {
		// Get all icons
		fetch("icons/games/gta5icons.svg")
			.then(res => res.text())
			.then(data => {
				this.svgData = data	// Store for PNG generation
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
@import url(../style/base.css);
@import url(../style/gtacolors.css);

body {
	background-image: url(/icons/patterns/checker.svg);
	background-size: 24px 24px;
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

.colorpick {
	width: 2rem;
	height: 2rem;
	border-radius: 2rem;
	background: conic-gradient(var(--gta-red), var(--gta-yellow), var(--gta-green), var(--gta-blue), var(--gta-purple), var(--gta-red));
}

.colorpick input {
	opacity: 0;	/* To open popup at actual location */
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

.save-dialog section {
	margin-block: 1rem;
}

svg {
	width: 100%;
	height: 100%;
}

/* SVG symbols */
#mapicons {
	display: none;
}
</style>