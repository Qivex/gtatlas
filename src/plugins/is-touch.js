export default {
	install(app, options) {
		// Mobile devices don't have any fine pointer
		// Caution: Firefox used to treat touchpads as "pointer: coarse"
		const isTouchDevice = !window.matchMedia("(any-pointer: fine)").matches

		// Provide as global property
		app.config.globalProperties.$isTouchDevice = isTouchDevice
	}
}