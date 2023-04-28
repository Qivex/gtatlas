import { createApp } from 'vue'
import App from '../apps/GridApp.vue'

import config from "../plugins/config.js"

// Init Vue app
createApp(App)
	.use(config, {prefix: "gta5"})
	.mount('#vue-app')