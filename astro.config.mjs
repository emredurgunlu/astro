import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-65l.pages.dev/',
	vite: {
		plugins: [tailwindcss()],
		server: {
			watch: { usePolling: true }
		}
	},
	integrations: [sitemap(), partytown({ config: { forward: ['gtag'] } })],
	redirects: {
		'/': '/tr/', // <— root'u her zaman /tr/'e yönlendir
	},
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp',
			config: {
				limitInputPixels: false,
			}
		},
		remotePatterns: [{ protocol: "https" }],
	},
});

