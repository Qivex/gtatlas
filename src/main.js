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
- <use> is way more efficient than a component cloning the same SVG into every icon
- the icons need styling (currentColor)
- Firefox loads SVG-<view> really inefficient (https://bugzilla.mozilla.org/show_bug.cgi?id=1121693) */