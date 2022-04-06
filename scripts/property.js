const templateList = ["property", "propertygroup"]


// Create v-scope for Property
function Property(id, icon, initial) {
	return {
		$template: "#property-template",
		id: id,
		icon: icon,
		value: (initial === undefined ? false : initial),
		nextValue: function() {this.value = !this.value}
	}
}


// Create v-scope for PropertyGroup
function PropertyGroup(id, children) {
	return {
		$template: "#propertygroup-template",
		id: id,
		children: children
	}
}


// Fetch templates
let body = document.querySelector("body")
// https://stackoverflow.com/questions/45285129
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await
await Promise.all(
	templateList.map(templateID => {
		return fetch(`data/templates/${templateID}.xml`)
			.then(res => res.text())
			.then(templateString => {
				let template = document.createElement("template")
				template.setAttribute("id", `${templateID}-template`)
				template.innerHTML = templateString
				body.appendChild(template)
			})
	})
)


export {Property, PropertyGroup}
