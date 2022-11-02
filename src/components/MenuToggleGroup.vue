<template>
	<div class="menu-togglegroup">
		<MenuToggleButton v-for="(menu,index) in menus" :menu="menu" gap="1rem" :index="index" :total="menus.length"/>
		<!-- :icon="menu.icon" -->
	</div>
</template>

<script>
import MenuToggleButton from "./MenuToggleButton.vue"

export default {
	name: "MenuToggleGroup",
	components: {
		MenuToggleButton
	},
	props: {
		menus: Array
	},
	inject: ["isMobile"]
}
</script>

<style>
.mobile-togglegroup {
	position: absolute;
	bottom: 0px;
}
</style>