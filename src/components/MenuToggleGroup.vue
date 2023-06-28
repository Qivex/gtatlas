<template>
	<div class="menu-togglegroup">
		<div class="menu-togglebutton camo" v-for="menu in menus" :class="{expanded: menu.expanded}" :style="{'--icon': menu.icon}" @click.left="menu.toggleExpanded"/>
	</div>
</template>

<script>
export default {
	name: "MenuToggleGroup",
	props: {
		menus: Array
	}
}
</script>

<style>
.menu-togglegroup {
	width: 100%;
	height: var(--toggle-height);
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--toggle-height), 1fr));
	column-gap: var(--toggle-gap);
	padding-inline: var(--toggle-gap);
}

.menu-togglebutton {
	width: 100%;
	height: 100%;
	box-shadow: 0 0 20px 5px #222;
	border-radius: 1.5rem 1.5rem 0 0;
	transition: transform 0.5s;
	transform: translateY(calc(-1 * var(--toggle-height)));
	/* Centers icon: */
	display: flex;
	place-content: center;
	place-items: center;
}

@media (prefers-reduced-motion) {
	.menu-togglebutton {
		transition: transform 0s;
	}
}

/* Move just like the menu */
.menu-togglebutton.expanded {
	transform: translateY(calc(-1 * calc(var(--expand-height) + var(--toggle-height))));
}

/* Icon */
.menu-togglebutton::after {
	position: absolute;	/* Doesnt show up without */
	content: "";
	width: 2.5rem;
	height: 2.5rem;
	background-image: var(--icon, url(/icons/hide.svg));	/* Fallback if no icon */
}

/* Replace icon with close-arrow when expanded */
.menu-togglebutton.expanded::after {
	background-image: url(/icons/hide.svg);
	transform: rotate(180deg);
}
</style>