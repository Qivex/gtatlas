const templateList = ["property", "propertygroup"]


// Create v-scope for Property
function Property(context, parent) {
	// Keep original object, don't use copy
	Object.assign(context, {
		$template: "#property-template",
		state: (context.initial === undefined ? false : context.initial),
		nextState: function() {this.state = !this.state},	//Todo: Update parent group state recusively
		debugClick: function() {
			window.myprop = this
			/* Problem:
			myprop.parent != mygroup, trotz mygroup.children[i] = myprop
			-> this.parent hat falsche ref
			-> Todo: ref-Attribut, sodass Parent sich mittels this.$refs selbst als parent setzt?
			*/
		},
		isReactive: function() {return this !== this.self},	//Equal by default, but broken after used in v-scope!
		self: context,
		parent: parent,
		updateParentRef: function() {
			/* Explanation:
			- When used as scope this context gets reactified
			- But parents ref isn't updated -> still points at non-reactified version of this
			- Therefore updates don't propagate properly (non-reactified version gets updated)
			- So we have to update the ref manually after mounting
			*/
			let index = this.parent.children.indexOf(this.self)
			this.parent.children[index] = this
		}
	})
	return context
}


// Create v-scope for PropertyGroup
function PropertyGroup(context, parent) {
	context = Property(context, parent)	//Reuse most of the props & functions
	Object.assign(context, {
		$template: "#propertygroup-template",
		debugClick: function() {window.mygroup = this}
	})
	/*
	Object.assign(context, {
		$template: "#propertygroup-template",
		_state: false,
		nextState: function() {this.state = !this.state},
		logState: function() {console.log(this.state)},
		isReactive: function() {return this !== this.self},
		self: context,
		parent: parent
	})
	*/
	Object.defineProperty(context, "state", {
		set: function(newstate) {
			this._state = newstate
			this.children.forEach(child => {
				child.state = newstate
				//console.log(child.isReactive())
			})
		},
		get: function() {return this._state}
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
