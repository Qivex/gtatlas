import { ref } from "vue"

export default {
	install(app, options) {
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
			return translateInternal(currentLanguage.value, stringID, ...content)
		}

		// Provide as global properties
		app.config.globalProperties.$availableLanguages = availableLanguages
		app.config.globalProperties.$lang = currentLanguage
		app.config.globalProperties.$translate = translate
	}
}