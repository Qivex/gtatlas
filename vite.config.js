import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	plugins: [vue()],
	publicDir: "static",
	build: {
		assetsDir: "bundle",
		rollupOptions: {
			input: {
				"main": "index.html",
				"grid": "grid.html"
			}
		}
	}
})