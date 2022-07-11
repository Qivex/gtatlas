import { createApp } from 'vue'
import App from './App.vue'

// Init Vue app
createApp(App).mount('#vue-app')

// Load GTA icons
fetch("icons/gtaicons.svg")
	.then(res => res.text())
	.then(data => {
		document.getElementById("mapicons").innerHTML = data
	})
/* Icons are included like this because:
- the icons need styling (currentColor) -> Cant use <img> or <view>
- Also Firefox loads SVG-<view> really inefficiently: https://bugzilla.mozilla.org/show_bug.cgi?id=1121693
- <use> is way more efficient than cloning the same SVG into every icon (inline component)
- <template src=""> fails with any file extension != html -> Manual fetch needed
- https://www.npmjs.com/package/vue-svg-inline-loader isn't compatible with Leaflet's (Div)Icons */