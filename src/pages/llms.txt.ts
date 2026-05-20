import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

const posts = await getCollection('blog')

const llmsTxt = `# Whynt | Software, Websites & Digital Marketing — Reliable Tech That Scales

Whynt delivers custom software, websites, API integrations, and digital marketing for small and mid-sized businesses.
We build maintainable, secure, and SEO-friendly solutions that help teams automate work, convert visitors, and scale revenue.

Core focus: custom web apps, CMS-driven marketing sites, API integrations, automation, and measurable digital growth.

Keywords: custom software, web development, API integrations, Cloudflare Workers, Astro, TypeScript, Tailwind, SEO, small business, digital marketing

Founder: Gautham Vinayachandran — Indian software engineer, founder of Whynt (founded 2026-04-17).

Last updated: ${new Date().toISOString()}

## Services
- Custom software & web apps — scalable single-page and server-rendered apps, backend APIs, and integrations.
- Websites & landing pages — accessible, performance-optimized, and SEO-focused designs.
- Integrations & automation — connect CRMs, payment providers, and internal systems using APIs and webhooks.
- Digital marketing & analytics — SEO, content strategy, paid acquisition, and analytics instrumentation.
- Maintenance & support — ongoing updates, monitoring, and performance optimization.

## Technologies & Patterns
- Languages & frameworks: JavaScript, TypeScript, Astro, React, Node.js
- Infrastructure: Cloudflare Workers, Durable Objects, serverless functions
- Datastores: PostgreSQL, Redis (or compatible key-value stores)
- Styling & tooling: Tailwind CSS, PostCSS
- Practices: automated testing, CI/CD, observability, privacy-first analytics

## Industries & Use Cases
- E-commerce: conversion-focused storefronts and headless integrations
- B2B SaaS: user portals, billing integrations, and onboarding flows
- Agencies & creatives: marketing sites, portfolios, and lead capture

## Why choose Whynt
- Focus on long-term maintainability and clear developer handoff
- Measurable outcomes: traffic, leads, and conversion improvements
- Transparent pricing and pragmatic engineering choices

-## Contact
- Contact page: ${new URL('contact', import.meta.env.SITE).href}
- Prefer email or the contact form for project inquiries and rates.

## Blog Posts
${posts
	.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
	.map((post) => {
		const date =
			post.data.pubDate instanceof Date
				? post.data.pubDate.toISOString().split('T')[0]
				: String(post.data.pubDate)
		const desc = post.data.description ? ` — ${post.data.description}` : ''
		const tags =
			Array.isArray(post.data.tags) && post.data.tags.length
				? ` Tags: ${post.data.tags.join(', ')}`
				: ''
		return `- [${post.data.title}](${new URL(`blog/${post.id}/`, import.meta.env.SITE).href}) — ${date}${desc}${tags}\n`
	})
	.join('')}

## Full content
- [All content in one file](${new URL('llms-full.txt', import.meta.env.SITE).href})

## Contact & Legal Links
- Contact page: ${new URL('contact', import.meta.env.SITE).href}
- Terms: ${new URL('terms', import.meta.env.SITE).href}
`

export const GET: APIRoute = () => {
	return new Response(llmsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
