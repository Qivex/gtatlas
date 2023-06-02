import { createApp } from 'vue'
import App from '../apps/AboutApp.vue'

import localization from "../plugins/localization.js"
import translations from "../data/translations.json"

// Init Vue app
createApp(App)
	.use(localization, translations)
	.mount("#vue-app")