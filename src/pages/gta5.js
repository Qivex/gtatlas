import { createApp } from "vue"
import App from "../apps/GTA5App.vue"

import localization from "../plugins/localization.js"
import translations from "../data/translations.json"

import isTouchDevice from "../plugins/is-touch.js"

import config from "../plugins/config.js"

// Init Vue app
createApp(App)
	.use(localization, translations)
	.use(isTouchDevice)
	.use(config, {prefix: "gta5"})
	.mount("#vue-app")