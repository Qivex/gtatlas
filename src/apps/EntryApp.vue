<template>
	<h1><b>GTA</b>tlas</h1>
	<h2>Locations of Grand Theft Auto</h2>
	<div class="links">
		<h3>Choose your map:</h3>
		<div class="maps">
			<a href="/gta5">
				<img alt="GTA5 Logo" src="https://media-rockstargames-com.akamaized.net/mfe4/__common/img/cc4b8d5c455ccb92dc0c.svg"/>
			</a>
			<a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
				<FakeLogo/>
			</a>
		</div>
		<h3>Learn more:</h3>
		<div class="refs">
			<!-- Todo: Links to About section, Github source etc. -->
			<ul>
				<li><a href="/about">About</a></li>
				<li><a href="https://github.com/qivex/gtatlas" target="_blank" rel="noopener noreferrer">Source on Github</a></li>
			</ul>
		</div>
	</div>
	<footer>
		<p>Last updated {{buildAge}} days ago</p>
	</footer>
</template>

<script>
import FakeLogo from "../components/FakeLogo.vue"

export default {
	name: "EntryApp",
	components: {
		FakeLogo
	},
	inject: ["buildtimestamp"],
	data() {
		return {
			buildAge: undefined
		}
	},
	mounted() {
		// Todo: Use Intl.RelativeTimeFormat
		this.buildAge = Math.floor((Date.now() - this.buildtimestamp) / (24 * 3600 * 1000))
		// window.alert("Days: " + this.buildAge + "\nTimestamp: " + this.buildtimestamp)
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400&display=swap');

body {
	position: fixed;
	width: 100vw;
	height: 100%;	/* Mobile Chrome includes search bar in 100vh */
	margin: 0px;
	padding: 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	background-color: #222;
	background-image: url(/icons/patterns/camo.svg);
	background-size: 100vw 100vh;
	background-repeat: no-repeat;
	font-family: 'Outfit', sans-serif;
}

p,li,h1,h2,h3 {
	margin: 0px;
	color: #F0F0F0;
	font-weight: 100;
}

h1 {
	color: #22D9A5;
	font-size: 20vmin;
}

h1 b {
	font-weight: 300;
}

h2 {
	font-size: var(--h2);
	font-weight: 400;
	transform: translateY(calc(-1 * var(--h2)));
}

h3 {
	font-size: var(--h3);
}

.links {
	display: flex;
	flex-direction: column;
	/* align-items: center; */
}

.maps {
	display: grid;
	grid-template-columns: repeat(2, 40vmin);
	margin-block: 1rem 2rem;
}

.maps a {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Margin or padding on parent dont work */
.maps a > * {
	max-width: 80%;
}

.refs a {
	color: #F0F0F0;
}

footer {
	position: absolute;
	bottom: 3vh;
	color: #F0F0F0;
}

:any-link {
	text-decoration: none;
}

@media (orientation: landscape) {
	:root {
		--h2: 5vh;
		--h3: 3vh;
	}
}

@media (orientation: portrait) {
	:root {
		--h2: 4vw;
		--h3: 5vw;
	}
}
</style>