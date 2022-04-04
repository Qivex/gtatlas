class Property {
	constructor(id, parent, onUpdate) {
		// Attributes
		this.id = id;
		this.value = false;	// Todo: initial values for both
		this.collapsed = false;
		// Related properties
		if (parent) {
			this.parentProperty = parent;
			parent.addChildProperty(this);
		}
		this.childProperties = [];
		// On Update
		if (onUpdate) {
			this.onUpdate = onUpdate;
		}
	}
	
	addChildProperty(property) {
		this.childProperties.push(property);
	}
	
	toggleCollapsed() {
		this.collapsed = !this.collapsed;
	}
	
	cycleValue() {
		// Fix for out of sync states: @change instead of @click
		switch(this.value) {
			case false:
				this.value = true;
				break;
			default:
				this.value = false;
		}
		// Update related properties
		// Note: Can't do this in value-setter (infinite loop)
		this.updateParentProperty();
		this.updateChildProperties();
	}
	
	updateParentProperty() {
		let parent = this.parentProperty;	// Shortcut
		// No need for update if no parent
		if (parent === undefined) return;
		// Calculate correct value
		let targetValue;
		for (let child of parent.childProperties) {
			// Skip if any child is already undefined
			if (child.value === undefined) {
				targetValue = undefined;
				break;
			}
			// Init first value
			if (targetValue === undefined) {
				targetValue = child.value;
				continue;
			}
			// Undefined if any child doesn't match
			if (child.value !== targetValue) {
				targetValue = undefined;
				break;
			}
		}
		parent.value = targetValue;
		// Continue up
		parent.updateParentProperty();
	}
	
	updateChildProperties() {
		// Don't update them to undefined
		if (this.value === undefined) return;
		// Set value for all of them
		for (let child of this.childProperties) {
			child.value = this.value;
			// Continue down
			child.updateChildProperties();
		}
	}
	
	set value(newValue) {
		// Skip if no change (don't call handler again)
		if (newValue === this._value) return;
		// Internal state
		this._value = newValue;
		// Visual state
		switch(newValue) {
			case true:
				this.checked = true;
				this.indeterminate = false;
				break;
			case false:
				this.checked = false;
				this.indeterminate = false;
				break;
			default:
				this.checked = false;
				this.indeterminate = true;
				break;
		}
		// Call handler
		this.onUpdate?.(this.id, this.value);
	}
	
	get value() {
		return this._value;
	}
}


/* Notes:
- Class instance can't be v-scope directly because hasOwnProperty returns false
- When using no seperate field "prop":
	- "this" resolves to window or (when set manually) to reactified (!) scope
	- Can't set parent/child relations between scopes correctly (they get reactified)
	- _value updates, but not rendered state
*/
function PropertyScope(model, parent, onUpdate) {
	return {
		prop: new Property(model.id, parent, onUpdate),
		model: model,
		$template: "#property-template"
	}
}

export {PropertyScope as default};
