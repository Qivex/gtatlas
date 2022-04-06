const localizationStrings = {}
const fallbackCountryID = "en"
const countryList = ["en", "de"]


// Updates all localized elements
function setLocale(countryID) {
	// Init lookups
	let countryStrings = localizationStrings[countryID]
	let fallbackStrings = localizationStrings[fallbackCountryID]
	// Is valid countryID?
	if (!countryStrings) {
		console.log(`No localizations for country ID "${countryID}". Using default "${fallbackCountryID}"`)
		countryStrings = fallbackStrings
	}
	// Update every affected paragraph element
	document.querySelectorAll("p[data-i18n]").forEach(p => {
		// Is valid stringID?
		let stringID = p.dataset.i18n	// https://stackoverflow.com/questions/52514335
		let newString = countryStrings[stringID] || fallbackStrings[stringID]
		// Don't update if there is no localization at all
		if (newString) {
			p.innerText = newString	// https://stackoverflow.com/questions/24427621
		}
	})
}


// Fetch localizations
await Promise.all(
	countryList.map(countryID => {
		return fetch(`data/i18n/${countryID}.json`)
			.then(res => res.json())
			.then(data => localizationStrings[countryID] = data)
	})
)
//.then(() => setLocale(fallbackCountryID))


export default setLocale
