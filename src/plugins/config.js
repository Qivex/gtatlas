import { ref, unref, watch } from "vue"

// Shortcut
let usp = new URLSearchParams(window.location.search)


function isLSEnabled() {
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
	const lsAllowed = ref(window.localStorage.length > 0)	// Assume previous consent if LS is already filled
	watch(lsAllowed, (state) => console.log("Updated lsAllowed: " + state))	// TEMP

	// Setup behavior on window close
	window.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			if (unref(lsAllowed) === true) {
				try {
					for (const id in callbacks) {
						window.localStorage.setItem(applyPrefix(id), callbacks[id]())
					}
				} catch (e) {
					// When localStorage is full
					console.log(e)
				}
			} else {
				window.localStorage.clear()
			}
		}
	})

	// Provide as global properties
	app.config.globalProperties.$lsAllowed = lsAllowed
	app.config.globalProperties.$fromConfig = getConfigValue
	app.config.globalProperties.$persist = persistOnClose
}


function installWithoutLocalStorage(app, options) {
	// Cant ever be allowed
	const lsAllowed = false

	// Get initial value from query or default
	function getConfigValue(queryID, lsID, defaultValue) {
		return usp.get(queryID) || defaultValue
	}

	// Can't persist because no access to localStorage
	function persistOnClose() {}

	// Provide as global properties
	app.config.globalProperties.$lsAllowed = lsAllowed
	app.config.globalProperties.$fromConfig = getConfigValue
	app.config.globalProperties.$persist = persistOnClose
}


export default {
	install(app, options) {
		// Determine if localStorage is accessible
		const lsEnabled = isLSEnabled()
		app.config.globalProperties.$lsEnabled = lsEnabled
		// Different installs
		if (lsEnabled) {
			installWithLocalStorage(app, options)
		} else {
			installWithoutLocalStorage(app, options)
		}
	}
}