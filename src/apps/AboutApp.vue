<template>
	<NavBar class="aboutnav">
		<a href="/" class="back"/>
		<h1>{{translate("nav_about")}}</h1>
		<LanguageSelector/>
	</NavBar>
	<About class="expanded camo"/>
</template>


<script>
import About from "../components/About.vue"
import NavBar from "../components/NavBar.vue"
import LanguageSelector from "../components/LanguageSelector.vue";

export default {
	name: "AboutApp",
	components: {
		About,
		NavBar,
		LanguageSelector
	},
	inject: ["currentLanguage", "defaultLanguage", "translate"],
	created() {
		this.currentLanguage = this.defaultLanguage
	}
}
</script>


<style>
@import url(../style/base.css);

body {
	--navbar-height: 3rem;
}

/* From other wrapper components */
.expanded {
	transform: none;
}

.selected {
	outline: white solid 2px;
}

/* Specific styling */
.aboutnav {
	background-color: #222;
	align-items: center;
	padding: 0.5rem;
}

.aboutnav .languages {
	max-width: 50%;
	margin-left: auto;
}

.back {
	width: 2rem;
	height: 2rem;
	margin-inline-end: 1rem;
	background-image: url(/icons/back.svg);
}

/* Offset to NavBar is also required for mobile in this context */
.about {
	position: absolute;
	top: var(--navbar-height, 0px);
	height: calc(100vh - var(--navbar-height, 0px));
	overflow-y: auto;
}
</style>