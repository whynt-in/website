import { defineConfig } from 'astro/config'
import icon from 'astro-icon'

import sitemap from '@astrojs/sitemap'

import tailwind from '@astrojs/tailwind'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	site: 'https://whynt.in/',
	integrations: [icon(), sitemap(), tailwind()],
	adapter: cloudflare(),
	trailingSlash: 'always',

	// Automatically compress HTML output
	compressHTML: true,

	vite: {
		build: {
			// Minify chunks using esbuild
			minify: 'esbuild',
			cssMinify: true
		}
	}
})
