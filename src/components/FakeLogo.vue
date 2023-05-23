<template>
	<div class="fakelogo">
		<img class="base" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Grand_Theft_Auto_logo_series.svg"/>
		<img class="random" :src="randomLogoURL"/>
	</div>
</template>

<script>
function randomInt(count) {
	return Math.floor(Math.random() * count)
}

export default {
	name: "FakeLogo",
	data() {
		return {
			randomLogoURL: undefined
		}
	},
	created() {
		// Note: Original implementation used background-position of ::after, but calculations were WAY to complex
		// Original image: 1600x1170 = 4x3 grid of 400x390 tiles
		// 1) Choose tile
		const column = randomInt(4)
		const row = randomInt(3)
		// 2) Prepare canvas
		let canvas = new OffscreenCanvas(400, 390)
		let ctx = canvas.getContext("2d")
		// 3) Load image
		let img = new Image()
		img.crossOrigin = "anonymous"
		img.src = "https://pbs.twimg.com/media/Fmwjsi6WQAALJ1W?format=jpg&name=large"	// from twitter.com/i/status/1615705617506926593
		img.onload = () => {
			// 4) Draw tile onto canvas
			ctx.drawImage(img, column*400, row*390, 400, 390, 0, 0, 400, 390)
			// 5) Make black pixels transparent
			let idata = ctx.getImageData(0, 0, 400, 390)
			let bytes = idata.data
			for (var i=0; i<bytes.length; i+=4) {
				if (bytes[i] === 0 && bytes[i+1] === 0 && bytes[i+2] === 0) {
					bytes[i+3] = 0
				}
			}
			ctx.putImageData(idata, 0, 0)
			// 6) Generate image from canvas
			canvas.convertToBlob().then(pngBlob => {
				this.randomLogoURL = URL.createObjectURL(pngBlob)
			})
		}
	}
}
</script>

<style>
.fakelogo {
	position: relative;	/* Required for absolute positioning on top */
}

.fakelogo .base {
	width: 100%;
}

.fakelogo .random {
	position: absolute;
	top: 63%;
	left: 73%;
	width: 50%;
	border-bottom-left-radius: 50%;	/* Crop index */
}
</style>