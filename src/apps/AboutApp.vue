<template>
	<NavBar class="aboutnav">
		<a href="/" class="back"/>
		<h1>{{translate("about_heading")}}</h1>
		<LanguageSelector/>
	</NavBar>
	<About class="expanded"/>
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
/* Defaults */
body {
	position: fixed; /* Fixes shifting viewport on mobile (https://stackoverflow.com/a/68359419) */
	height: 100%;
	width: 100%;
	margin: 0px;
	padding: 0px;
	background-color: #222;
	background-image: url(/icons/patterns/camo.svg);
	background-size: 100vw 100vh;
	background-repeat: no-repeat;
	color: #fff;	/* Initial org-color for icons (defaults to black) */
	font-family: arial;
	--navbar-height: 3rem;
}

p,h1,h2,h3,h4,h5,h6 {
	margin: 0px;
	color: #fff;
	font-weight: normal;
}

/* From other wrapper components */
.expanded {
	transform: none;
}

.selected {
	outline: white solid 2px;
}

@media (pointer: fine) {
	.pointer {
		cursor: pointer;
	}
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
	background-image: url(icons/back.svg);
}
</style>