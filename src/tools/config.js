function getInitialValue(queryID, localStorageID, defaultValue) {
	try {
		// Shortcuts
		let usp = new URLSearchParams(window.location.search)
		let ls = window.localStorage
		// Priority: URL > LS > Default
		return usp.get(queryID) ?? ls.getItem(localStorageID) ?? defaultValue
	} catch (e) {
		// User doesn't allow localStorage (e instanceof SecurityError)
		return usp.get(queryID) ?? defaultValue
	}
}

const callbacks = {}
var lsAllowed = false

function saveOnClose(id, getter) {
	callbacks[id] = getter
}

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

// Setup
try {
	let ls = window.localStorage
	// Initialize lsAllowed (examine if localStorage is occupied)
	lsAllowed = ls.length > 0
	// Setup event saving all values
	window.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden" && lsAllowed === true) {
			for (const id in callbacks) {
				ls.setItem(id, callbacks[id]())
			}
		}
	})
} catch (e) {
	console.log("Ignoring localStorage, probably disabled")
}

export {
	getInitialValue,
	saveOnClose,
	setLSAllowed,
	isLSAllowed
}