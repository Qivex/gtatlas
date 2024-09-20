<template>
	<div class="leaflet-popup-vue">
		<slot/>
	</div>
</template>

<style>
/* Replace tip of Leaflet.popup with custom clip-path */
:has(.leaflet-popup-vue) .leaflet-popup-tip-container {
	display: none;
}

:has(.leaflet-popup-vue) .leaflet-popup-content-wrapper {
	background-color: rgba(0,0,0,0.5);
	backdrop-filter: blur(5px);
	border-radius: 0;
	clip-path: polygon(
		0% 0%,
		0% calc(100% - 40px),
		calc(50% - 8px) calc(100% - 40px),
		calc(50% - 8px) calc(100% - 24px),
		calc(50% - 20px) calc(100% - 24px),
		50% 100%,
		calc(50% + 20px) calc(100% - 24px),
		calc(50% + 8px) calc(100% - 24px),
		calc(50% + 8px) calc(100% - 40px),
		100% calc(100% - 40px),
		100% 0%
	);
	padding-bottom: 40px;
}
</style>