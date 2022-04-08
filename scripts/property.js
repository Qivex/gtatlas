const templateList = ["property", "propertygroup"]


// Create v-scope for Property
function Property(context) {
	Object.assign(context, {
		$template: "#property-template",
		state: (context.initial === undefined ? false : context.initial),
		nextState: function() {this.state = !this.state}
	})
	return context
}


// Create v-scope for PropertyGroup
function PropertyGroup(context) {
	Object.assign(context, {
		$template: "#propertygroup-template"
	})
	return context
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
