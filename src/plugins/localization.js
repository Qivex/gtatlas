import { ref, unref, computed } from "vue"

export default {
	install(app, options) {
		// Temporary config (default after Vue 3.3)
		// app.config.unwrapInjectedRef = true

		// "options" provide translations
		const translations = options

		// Internal logic
		const translateInternal = function(langID, stringID, ...contentForPlaceholders) {
			// Get localization for selected language
			let langLocalization = translations?.[langID]
			// Split stringID and traverse translations (Inspired by https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin)
			function selectProperty(object, key) {
				if (object) return object[key]
			}
			let localizedString = stringID.split(".").reduce(selectProperty, langLocalization) || ""
			// Replace placeholders with content
			if (contentForPlaceholders.length === 0) {
				return localizedString
			}
			function nextContent() {
				return contentForPlaceholders.shift() || ""
			}
			return localizedString.replaceAll("{}", nextContent)
		}

		const userLanguage = window.navigator.language.substring(0,2)	// Only use primary tag

		// Exposed properties
		const availableLanguages = Object.keys(translations)

		const defaultLanguage = availableLanguages.includes(userLanguage) ? userLanguage : "en"	// Fallback to english if no translations for user language

		const currentLanguage = ref()

		const translate = function(stringID, ...contentForPlaceholders) {
			return translateInternal(unref(currentLanguage), stringID, ...contentForPlaceholders)
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