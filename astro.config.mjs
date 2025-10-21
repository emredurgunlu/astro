// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import { partytownSnippet } from '@builder.io/partytown/integration';

// https://astro.build/config
export default defineConfig({
	site: 'https://my-astro-app.emredurgunlu.workers.dev/',
	vite: {
		plugins: [tailwindcss()],
		server: {
			watch: {
				usePolling: true,
			}
		}
	},
	integrations: [mdx(), sitemap(), partytownSnippet({ forward: ['gtag'] })],
});

