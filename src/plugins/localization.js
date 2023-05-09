import { ref, unref, computed } from "vue"

export default {
	install(app, options) {
		// Temporary config (default after Vue 3.3)
		app.config.unwrapInjectedRef = true

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

		// Exposed properties
		const availableLanguages = Object.keys(translations)

		const currentLanguage = ref()

		const translate = function(stringID, ...content) {
			return translateInternal(unref(currentLanguage), stringID, ...content)
		}

		// Provide to app
		app.provide("availableLanguages", availableLanguages)
		app.provide("currentLanguage", computed({
			get: () => currentLanguage.value,
			set: (newLanguage) => currentLanguage.value = newLanguage
		}))
		app.provide("translate", translate)
	}
}