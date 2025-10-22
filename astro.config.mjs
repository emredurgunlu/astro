// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-65l.pages.dev/',
	vite: {
		plugins: [tailwindcss()],
		server: {
			watch: {
				usePolling: true,
			}
		}
	},
	integrations: [mdx(), sitemap(), partytown({ config: { forward: ['gtag'] } })],
});

