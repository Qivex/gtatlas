<template>
	<div class="propertygroup">
		<div class="property" tabindex="0">
			<input type="checkbox" :id="id" :indeterminate="indeterminate" v-model="state" @click.left="cycleState"/>
			<div class="styled-checkbox pointer" @click.left="cycleState"></div>
			<p>{{translate("tree-"+id)}}</p>
			<div class="collapse-icon pointer" :class="{collapsed}" @click.left="cycleCollapse"></div>
		</div>
		<ul :class="{collapsed}">
			<li v-for="child in children">
				<Component :is="child.children ? 'PropertyGroup' : 'Property'" v-bind="child" ref="childcomponents"/>
			</li>
		</ul>
	</div>
</template>


<script>
import Property from "./Property.vue"

export default {
	name: "PropertyGroup",
	components: {
		Property
	},
	props: {
		id: String,
		children: Array
	},
	inject: ["translate"],
	computed: {
		indeterminate() {
			return this.state === undefined;
		}
	},
	data() {
		return {
			state: false,
			collapsed: false
		}
	},
	watch: {
		state() {
			// Chain down
			if (this.state !== undefined) {	// Don't update children to undefined
				this.$refs.childcomponents.forEach(child => child.state = this.state)
			}
		}
	},
	methods: {
		cycleCollapse() {
			this.collapsed = !this.collapsed
		},
		cycleState() {
			switch(this.state) {
				case false:
					this.state = true
					break
				default:
					this.state = false
			}
			this.$parent.update?.()
		},
		update() {
			let targetState
			for (let child of this.$refs.childcomponents) {
				// Skip if any child is already undefined
				if (child.state === undefined) {
					targetState = undefined
					break
				}
				// Init first value
				if (targetState === undefined) {
					targetState = child.state
					continue
				}
				// Undefined if any child doesn't match
				if (child.state !== targetState) {
					targetState = undefined
					break
				}
			}
			this.state = targetState
			// Chain up
			this.$parent.update?.()	// Optional call (parent might be the wrapping PropertyTree instead of PropertyGroup)
		}
	},
	mounted() {
		this.update()
	}
}
</script>


<style>
/* Overwrite list defaults */
.propertygroup ul {
	list-style-type: none;
	padding: 0;
	margin: 0px;
	margin-left: 20px;
	transform-origin: top left;
	transition: transform 0.3s;
}

/* Collapse with animation */
.propertygroup ul.collapsed {
	transform: scaleY(0);
}

/* ul's height cant be animated because its not explicit -> Solution: Each child .property is animated */
.property {
	transition: height 0.3s;
}

.collapsed .property {
	height: 0px;
}

/* Indeterminate state only possible on groups */
.property input:indeterminate + .styled-checkbox {
	background-image: url(/icons/check-mixed.svg);
}

/* Icon for collapsing */
.collapse-icon {
	width: 30px;
	height: 30px;
	position: absolute;
	right: 10px;
	background-image: url(/icons/collapse.svg);
	transition: transform 0.3s;
}

/* Flip on collapse */
.collapse-icon.collapsed {
	transform: scaleY(-1);
}

/* Invert icon on hover */
@media (hover: hover) {
	.property:is(:hover,:focus,:active) > .collapse-icon {
		filter: invert(1);
	}
}
</style>