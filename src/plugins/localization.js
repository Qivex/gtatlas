import { ref, unref, computed } from "vue"

export default {
	install(app, options) {
		// Temporary config (default after Vue 3.3)
		// app.config.unwrapInjectedRef = true

		// "options" provide translations
		const translations = options

		// Internal logic
		const translateInternal = function(langID, stringID, ...content) {
			let localizedString = translations?.[langID]?.[stringID] || ""
			if (content.length === 0) {
				return localizedString
			}
			// Replace placeholders with content
			function nextContent() {
				return content.pop() || ""
			}
			return localizedString.replaceAll("{}", nextContent)
		}

		const userLanguage = window.navigator.language.substring(0,2)	// Only use primary tag

		// Exposed properties
		const availableLanguages = Object.keys(translations)

		const defaultLanguage = availableLanguages.includes(userLanguage) ? userLanguage : "en"	// Fallback to english if no translations for user language

		const currentLanguage = ref()

		const translate = function(stringID, ...content) {
			return translateInternal(unref(currentLanguage), stringID, ...content)
		}

		// Provide to app
		app.provide("availableLanguages", availableLanguages)
		app.provide("defaultLanguage", defaultLanguage)
		app.provide("currentLanguage", computed({
			get: () => currentLanguage.value,
			set: (newLanguage) => currentLanguage.value = newLanguage
		}))
		app.provide("translate", translate)
	}
}