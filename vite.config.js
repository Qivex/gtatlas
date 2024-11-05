import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

/* Note:
Vite requires its project root to be at the location of all the HTML files to serve them during development:
https://vite.dev/guide/#index-html-and-project-root

This might be fine for a single index.html, but in this project with several HTML files it would be rather messy.
Instead they are located in /src/html instead of the top directory. The Vite project root reflects this.
Most other paths (public & dist) are usually relative to the project root, however here they must resolve to the
true root (top directory), not the project root (html directory).

Also resolve.alias is required to keep imports functional without changing all of them relative to the new root.
*/

const TRUE_ROOT = __dirname
const HTML_ROOT = "src/html"

export default defineConfig({
	plugins: [vue()],
	root: HTML_ROOT,
	publicDir: resolve(TRUE_ROOT, "static"),
	build: {
		outDir: resolve(TRUE_ROOT, "dist"),
		assetsDir: "bundle",
		rollupOptions: {
			input: {
				"entry": resolve(HTML_ROOT, "index.html"),
				"about": resolve(HTML_ROOT, "about.html"),
				"gta5":  resolve(HTML_ROOT, "gta5.html"),
				"grid":  resolve(HTML_ROOT, "grid.html"),
				"icons": resolve(HTML_ROOT, "icons.html")
			}
		}
	},
	resolve: {
		alias: {
			"/src": resolve(TRUE_ROOT, "src")
		}
	},
	define: {
		__BUILD_TIMESTAMP__: Date.now().toString()
	}
})