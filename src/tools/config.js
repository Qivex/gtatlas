// Prefix properties in localStorage (enable multiple pages in origin)
var configPrefix

function selectConfig(prefix) {
	configPrefix = String(prefix)
}

function applyPrefix(str) {
	return configPrefix + "-" + str
}

// Read initial value from query param or localStorage
function getConfigValue(queryID, localStorageID, defaultValue) {
	try {
		// Shortcuts
		let usp = new URLSearchParams(window.location.search)
		let ls = window.localStorage
		// Priority: URL > LS > Default
		return usp.get(queryID) ?? ls.getItem(applyPrefix(localStorageID)) ?? defaultValue
	} catch (e) {
		// User doesn't allow localStorage (e instanceof SecurityError)
		return usp.get(queryID) ?? defaultValue
	}
}

// Determine if localStorage should be written to
var lsAllowed = false

function setLSAllowed(allowed) {
	lsAllowed = !!allowed
	// Clear localStorage immediately
	if (!lsAllowed) {
		try {
			window.localStorage.clear()
		} catch (e) {
			// Nothing to do since localStorage cant be accessed anyway
		}
	}
}

function isLSAllowed() {
	return lsAllowed
}

// Setup values saved in localStorage (callbacks on visibilitychange)
const callbacks = {}

function saveOnClose(id, getter) {
	callbacks[id] = getter
}

// Main: Initialize config behaviour
try {
	// Shortcut
	let ls = window.localStorage
	// Initialize lsAllowed (examine if localStorage is occupied)
	lsAllowed = ls.length > 0
	// Assume prefix from path if it isn't set for some reason
	configPrefix = window.location.pathname
		.slice(1)
		.replace(".html", "")
		.replaceAll("/", "-")
	// Setup event saving all values
	window.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden" && lsAllowed === true) {
			try {
				for (const id in callbacks) {
					ls.setItem(applyPrefix(id), callbacks[id]())
				}
			} catch (e) {
				console.log("Error while writing to localStorage, probably full")
			}
		}
	})
} catch (e) {
	console.log("Ignoring localStorage, probably disabled")
}

export {
	selectConfig,
	getConfigValue,
	setLSAllowed,
	isLSAllowed,
	saveOnClose
}