import { createApp } from 'vue'
import App from './components/IndexApp.vue'

import localization from './plugins/localization.js'
import translations from "./data/translations.json"

// Init Vue app
let app = createApp(App)
app.config.unwrapInjectedRef = true	// Temporary opt-in
app.use(localization, translations)
app.mount("#vue-app")