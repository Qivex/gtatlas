import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	plugins: [vue()],
	publicDir: "static",
	build: {
		assetsDir: "bundle",
		rollupOptions: {
			input: {
				"entry": "index.html",
				"gta5": "gta5.html",
				"grid": "grid.html",
				"icons": "icons.html"
			}
		}
	},
	define: {
		__BUILD_TIMESTAMP__: JSON.stringify(Date.now())
	}
})