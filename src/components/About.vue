<template>
	<div class="about">
		<Section>
			<a href="/">
				<img class="logo" :src="'icons/gtatlas.svg'"/>
			</a>
		</Section>
		<!-- TODO: Different order. Probably 1,9,2,8,7,6,3,4,5,10 -->
		<Section titleID="about.1.h">
			<p>{{translate("about.1.p")}}</p>
		</Section>
		<Section titleID="about.2.h">
			<p v-html="p2"/>
		</Section>
		<Section titleID="about.3.h">
			<p v-html="p3"/>
		</Section>
		<Section titleID="about.4.h">
			<p v-html="p4"/>
		</Section>
		<Section titleID="about.5.h">
			<p v-html="p5"/>
		</Section>
		<Section titleID="about.6.h">
			<p>{{translate("about.6.p")}}</p>
			<div class="techpromo">
				<a v-for="link in techpromos" :href="link.href" :style="{'--logo': `url(${link.logo})`}" target="_blank" rel="noopener noreferrer"></a>
			</div>
		</Section>
		<Section titleID="about.7.h">
			<p v-html="p7"/>
		</Section>
		<Section titleID="about.8.h">
			<p v-html="p8a"/>
			<p v-html="p8b"/>
		</Section>
		<Section titleID="about.9.h">
			<p>{{translate("about.9.p")}}</p>
		</Section>
		<Section titleID="about.10.h">
			<p>{{translate("about.10.p")}}</p>
			<div class="mappromo">
				<a v-for="link in mappromos" :href="link.href" target="_blank" rel="noopener noreferrer">
					<img :src="link.logo"/>
				</a>
			</div>
		</Section>
	</div>
</template>


<script>
import Section from "./Section.vue"

function a(href, content, isExternal) {
	if (isExternal) {
		return `<a href="${href}" target="_blank" rel="noopener noreferrer">${content}</a>`
	}
	return `<a href="${href}">${content}</a>`
}

export default {
	name: "About",
	components: {
		Section
	},
	inject: ["translate"],
	data() {
		return {
			mappromos: [
				{
					href: "https://gta-5-map.com",
					logo: "https://cdn.mapgenie.io/images/mapgenie.png"
				},
				{
					href: "https://gtaweb.eu/gtao-map",
					logo: "https://gtaweb.eu/_sources/1658057461/img/logo2.png"
				},
				{
					href: "https://gtalens.com/map",
					logo: "https://gtalens.com/assets/images/logo-new.1b4a64.png"
				}
			],
			techpromos: [
				{
					href: "https://render.com",
					logo: "https://render.com/favicon.svg"
				},
				{
					href: "https://vitejs.dev",
					logo: "https://vitejs.dev/logo.svg"
				},
				{
					href: "https://vuejs.org",
					logo: "https://vuejs.org/logo.svg"
				},
				{
					href: "https://leafletjs.com",
					logo: "https://raw.githubusercontent.com/Leaflet/Leaflet/main/src/images/logo.svg"
				}
			]
		}
	},
	computed: {
		p2() {
			return this.translate("about.2.p")
		},
		p3() {
			return this.translate(
				"about.3.p",
				a("https://play.google.com/store/apps/details?id=com.rockstargames.gtavmanual", this.translate("about.3.a"), true)
			)
		},
		p4() {
			return this.translate("about.4.p")
		},
		p5() {
			return this.translate(
				"about.5.p",
				a("/icons", this.translate("about.5.a"), true)
			)
		},
		p7() {
			return this.translate(
				"about.7.p",
				a("TODO", this.translate("about.7.a1", true)),
				a("https://github.com/Qivex/gtatlas", this.translate("about.7.a2"), true)
			)
		},
		p8a() {
			return this.translate(
				"about.8.p1",
				a("/feedback", this.translate("about.8.a1"), true)
			)
		},
		p8b() {
			return this.translate(
				"about.8.p2",
				a("https://github.com/Qivex/gtatlas", this.translate("about.8.a2"), true)
			)
		}
	}
}
</script>


<style>
.about p {
	text-align: justify;
}

.about a {
	color: white;
}

.about .logo {
	height: 10vmin;
}

/* Previously:
.techpromo {
	display: grid;
	min-height: 3rem;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 15%;
	margin-block-start: 0.5rem;
}
*/

.techpromo {
	display: flex;
	justify-content: space-between;
	margin-block-start: 0.5rem;
}

.techpromo a {
	aspect-ratio: 1/1;
	height: 7vmax;
	background-image: var(--logo);
	background-size: cover;
	background-position: right;
}

.mappromo {
	display: flex;
	align-items: center;
}

@media (pointer: coarse) {
	.mappromo {
		flex-direction: column;
	}
}

.mappromo a {
	width: 80%;
	margin: 1rem;
}

.mappromo img {
	width: 100%;
}

@media (pointer: fine) {
	.about {
		position: absolute;
		top: var(--navbar-height, 0px);
		left: 0px;
		width: 100vw;
		height: calc(100vh - var(--navbar-height, 0px));
		transform: translateY(100vh);
	}

	.about section {
		margin-inline: calc(50% - 25rem);
	}
}
</style>