import { createApp } from 'vue'
import App from './components/IndexApp.vue'

// Init Vue app
let app = createApp(App)
app.config.unwrapInjectedRef = true	// Temporary opt-in
app.mount("#vue-app")