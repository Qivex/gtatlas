import { createApp } from 'vue'
import App from './components/I18nApp.vue'
import localization from './plugins/localization.js'

const translations = {
	"de": {
		"test-p": "{}mal geklickt",
		"test-but": "Erhöhe"
	},
	"en": {
		"test-p": "{}x clicked",
		"test-but": "Increase"
	}
}

// Init Vue app
let app = createApp(App)
app.use(localization, translations)
app.mount('#vue-app')