<template>
	<div class="moreinfo" @mouseleave="closeContent">
		<div class="moreinfo-icon" @mouseenter="openContent" @click.left="toggleKeepOpen"></div>
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
		openContent() {
			this.open = true
			// TODO: Move content to suitable position
			let content = this.$refs.content
			content.style.top = "40px"
			content.style.left = "40px"
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
		}
	}
}
</script>


<style>
.moreinfo-icon {
	width: 2rem;
	height: 2rem;
	background-color: red;
	background-image: url(icons/moreinfo.svg);
}

.moreinfo-content {
	position: absolute;
	background: #222;
	padding: 1rem;
	border-radius: 1rem;
	max-width: 50%;
	max-height: 50%;
	overflow: auto;
}
</style>