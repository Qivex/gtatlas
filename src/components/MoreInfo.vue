<template>
	<div class="moreinfo" @mouseleave="closeContent">
		<div class="moreinfo-icon pointer" @mouseenter="openContent" @click.left="toggleKeepOpen"></div>
		<div class="moreinfo-content" v-show="open" ref="content">
			<slot/>
		</div>
	</div>
</template>


<script>
export default {
	name: "MoreInfo",
	data() {
		return {
			keepOpen: false,
			open: false
		}
	},
	methods: {
		openContent(event) {
			this.open = true
			// TODO: Move content to suitable position

			let content = this.$refs.content
			//content.style.y = event.clientY
		},
		closeContent() {
			// Note: mouseout would be too eager (https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event)
			// Only close if toggle wasn't clicked before
			if (!this.keepOpen) {
				this.open = false
			}
		},
		toggleKeepOpen() {
			this.keepOpen = !this.keepOpen
			// Finally close content if toggle is clicked again
			if (this.open && !this.keepOpen) {
				this.open = false
			}
			// Fix for mobile: Open without mouseenter
			if (!this.open && this.keepOpen) {
				this.open = true
			}
		}
	}
}
</script>


<style>
.moreinfo {
	--moreinfo-icon-size: 1.8rem;
}

.moreinfo-icon {
	width: var(--moreinfo-icon-size);
	height: var(--moreinfo-icon-size);
	background-image: url(icons/info.svg);
}

.moreinfo-content {
	position: absolute;
	left: 5%;
	right: 5%;
	transform: translateY(calc(-100% - var(--moreinfo-icon-size)));
	background: #222;
	padding: 1rem;
	border: 1px solid #fff;
	border-radius: 1rem;
	overflow: auto;
}
</style>