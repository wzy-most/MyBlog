import { getCollection } from 'astro:content';

export const base = import.meta.env.BASE_URL;

export function sitePath(path = '') {
	const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `${cleanBase}${cleanPath}`;
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}

export function slugifyTag(tag: string) {
	return tag
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\p{Letter}\p{Number}-]/gu, '');
}

export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllTags() {
	const posts = await getPublishedPosts();
	const tagMap = new Map<string, { name: string; slug: string; count: number }>();

	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = slugifyTag(tag);
			const current = tagMap.get(slug);

			if (current) {
				current.count += 1;
			} else {
				tagMap.set(slug, { name: tag, slug, count: 1 });
			}
		}
	}

	return [...tagMap.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}
