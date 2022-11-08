<template>
	<div class="menu-togglegroup">
		<MenuToggleButton v-for="(menu,index) in menus" :menu="menu" :icon="menu.icon" gap="1rem" :index="index" :total="menus.length"/>
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