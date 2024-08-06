<template>
	<img class="logo" :src="'icons/gtatlas.svg'"/>
	<h2>Locations of Grand Theft Auto</h2>
	<div class="links">
		<h3>Choose your map:</h3>
		<div class="maps">
			<a href="/gta5">
				<img alt="GTA5 Logo" src="https://media-rockstargames-com.akamaized.net/mfe4/__common/img/cc4b8d5c455ccb92dc0c.svg"/>
			</a>
			<a href="https://youtu.be/xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
				<img alt="GTA6 Logo" src="https://i.imgur.com/b5tfT2R.png"/>
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
		<p>Last updated {{buildAge}} day{{buildAge === 1 ? "" : "s"}} ago</p>
	</footer>
</template>

<script>
export default {
	name: "EntryApp",
	data() {
		return {
			buildAge: Math.floor((Date.now() - __BUILD_TIMESTAMP__) / 864e5)	// 24 * 3600 * 1000
		}
	}
}
</script>

<style>
@import url(../style/base.css);

body {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

ul {
	margin: 0px;
}

.logo {
	height: 20vmin;
}

h2 {
	font-size: var(--h2);
	font-weight: 400;
}

h3 {
	font-size: var(--h3);
	margin-block: 2rem 1rem;
}

.links {
	display: flex;
	flex-direction: column;
}

.maps {
	display: grid;
	grid-template-columns: repeat(2, 40vmin);
}

.maps a {
	width: 100%;
	height: 100%;
	display: flex;
	place-items: center;
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