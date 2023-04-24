import { ref, unref, watch, computed } from "vue"

// Shortcut
let usp = new URLSearchParams(window.location.search)


function testIfLocalStorageEnabled() {
	try {
		window.localStorage
		return true
	} catch {
		return false
	}
}


function installWithLocalStorage(app, options) {
	// Prefix enables multiple configs (= pages) in same origin
	const defaultPrefix = window.location.pathname	// Assume prefix from path
		.slice(1)
		.replace(".html", "")
		.replaceAll("/", "-")
	const configPrefix = options?.prefix || defaultPrefix	// Prefer manually set prefix
	function applyPrefix(id) {
		return `${configPrefix}-${id}`
	}

	// Get initial value from query or localStorage or default
	function getConfigValue(queryID, lsID, defaultValue) {
		// Priority: URL query > localStorage > Default
		return usp.get(queryID) ?? window.localStorage.getItem(applyPrefix(lsID)) ?? defaultValue
	}

	// Save getter-methods to persist values on window-hide
	const callbacks = []
	function persistOnClose(id, getter) {
		callbacks[id] = getter
	}

	// Initialize consent to use localStorage
	const isLocalStorageAllowed = ref(window.localStorage.length > 0)	// Assume previous consent if LS is already filled
	watch(isLocalStorageAllowed, (state) => console.log("Updated isLocalStorageAllowed: " + state))	// TEMP

	// Setup behavior on window close
	window.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			if (unref(isLocalStorageAllowed) === true) {
				try {
					for (const id in callbacks) {
						window.localStorage.setItem(applyPrefix(id), callbacks[id]())
					}
				} catch (e) {
					// When localStorage is full
					console.log(e)
				}
			} else {
				window.localStorage.clear()	// Caution: This clears all configs of origin, not just current prefix!
			}
		}
	})

	// Provide to app
	app.provide("isLocalStorageAllowed", computed({
		get: () => isLocalStorageAllowed.value,
		set: (newAllowed) => isLocalStorageAllowed.value = newAllowed
	}))
	app.provide("getConfigValue", getConfigValue)
	app.provide("persistOnClose", persistOnClose)
}


function installWithoutLocalStorage(app, options) {
	// Can't ever be allowed
	const isLocalStorageAllowed = false

	// Get initial value from query or default
	function getConfigValue(queryID, lsID, defaultValue) {
		return usp.get(queryID) || defaultValue
	}

	// Can't persist because no access to localStorage
	function persistOnClose() {}

	// Provide to app
	app.provide("isLocalStorageAllowed", isLocalStorageAllowed)	// Always false -> no reactivity needed
	app.provide("getConfigValue", getConfigValue)
	app.provide("persistOnClose", persistOnClose)
}


export default {
	install(app, options) {
		// Temporary config (default after Vue 3.3)
		app.config.unwrapInjectedRef = true

		// Determine if localStorage is accessible
		const isLocalStorageEnabled = testIfLocalStorageEnabled()
		app.provide("isLocalStorageEnabled", isLocalStorageEnabled)
		// Different installs
		if (isLocalStorageEnabled) {
			installWithLocalStorage(app, options)
		} else {
			installWithoutLocalStorage(app, options)
		}
	}
}