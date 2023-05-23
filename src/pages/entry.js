import { createApp } from 'vue'
import App from '../apps/EntryApp.vue'

// Init Vue app
createApp(App)
	.provide("buildtimestamp", __BUILD_TIMESTAMP__)
	.mount('#vue-app')