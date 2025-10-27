import { defineCollection, z } from 'astro:content';
import { getCollection } from "astro:content";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(), // <— string yerine image()
		lang: z.string().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).default([])
	}),
});

export const collections = { blog };

export async function getBlogPosts() {
	const posts = await getCollection('blog');

	return posts.map((post) => {
		const blog_slug = post.slug.split('/')[0];
		return {
			...post,
			blog_slug
		}
	})
}