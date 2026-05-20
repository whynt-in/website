import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

const posts = await getCollection('blog')

const llmsFullTxt = `# Whynt | Software, Websites & Digital Marketing — Full Content

Whynt delivers custom software, websites, API integrations, and digital marketing for small and mid-sized businesses.
We focus on delivering maintainable, secure, and performance-optimized solutions that improve automation, conversion, and growth.

Core focus: custom web applications, CMS-driven marketing sites, API integrations, automation, and measurable digital growth.

Keywords: custom software; web development; API integrations; Cloudflare Workers; Astro; TypeScript; Tailwind; SEO; small business; digital marketing

Founder: Gautham Vinayachandran — Indian software engineer, founder of Whynt (founded 2026-04-17).

Last updated: ${new Date().toISOString()}

## Executive Summary
- Who: Whynt — a small/mid-market-focused engineering and digital marketing studio.
- What: end-to-end product development, websites, integrations, and growth marketing.
- How: pragmatic engineering, performance-first design, and data-driven marketing.

## Services
- Custom software & web apps — single-page and server-rendered apps, backend APIs, integrations.
- Websites & landing pages — accessible, performance-optimized, SEO-first designs.
- Integrations & automation — CRMs, payments, analytics, and custom webhooks.
- Digital marketing & analytics — content strategy, SEO, paid acquisition, and analytics instrumentation.
- Maintenance & support — monitoring, security updates, and performance improvements.

## Process & Delivery
1. Discovery & scope — goals, KPIs, and success metrics.
2. Planning & architecture — API design, data models, and deployment plan.
3. Implementation — iterative development with automated tests and code reviews.
4. Launch & optimization — performance tuning, SEO, and analytics verification.
5. Support & growth — ongoing improvements and feature delivery.

## Security, Privacy & Compliance
- Transport security: HTTPS/TLS everywhere; secure cookie practices.
- Data protection: minimize stored PII; follow best-practice access controls.
- Development practices: dependency audits, basic secrets management, and environment segregation.
- Compliance: privacy-by-design approach; link to privacy policy via site contact pages.

## Accessibility & Internationalization
- Accessibility: semantic HTML, keyboard navigation, and WCAG-aware design.
- Localization: content can be structured for multiple locales; default language is English (en).

## Pricing & Engagement Model
- Typical engagement: fixed-scope projects, monthly retainers for maintenance, or time-and-materials for long-term partnerships.
- Transparent proposals and milestone-based payments.

## Technologies & Patterns
- Languages & frameworks: JavaScript, TypeScript, Astro, React, Node.js
- Infrastructure: Cloudflare Workers, Durable Objects, serverless functions
- Datastores: PostgreSQL, Redis or compatible key-value stores
- Styling & tooling: Tailwind CSS, PostCSS
- Practices: automated testing, CI/CD, observability, privacy-first analytics

## Industries & Use Cases
- E-commerce: conversion-focused storefronts and headless commerce integrations
- B2B SaaS: user portals, billing and subscription integrations, onboarding flows
- Agencies & creatives: marketing sites, portfolios, and lead capture systems

## Case Study Format (template for LLMs)
When summarizing projects, include: objective, solution, tech stack, timeline, measurable results (traffic, conversions, revenue), and links.

## Machine-readable Metadata (JSON)
{
  "site_url": "${import.meta.env.SITE}",
  "name": "Whynt",
  "founder": "Gautham Vinayachandran",
  "founded": "2026-04-17",
  "core_services": ["custom_software", "websites", "integrations", "digital_marketing"],
  "technologies": ["Astro", "TypeScript", "Cloudflare Workers", "Tailwind"],
  "contact_page": "${import.meta.env.SITE}contact",
  "locale": "en-US",
  "content_type": "developer_and_marketing_corpus",
  "structured_for_llm": true
}

## Blog Posts — With full content
${posts
	.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
	.map((post) => {
		const path = `${import.meta.env.SITE}blog/${post.id}/`
		const date =
			post.data.pubDate instanceof Date
				? post.data.pubDate.toISOString().split('T')[0]
				: String(post.data.pubDate)
		const desc = post.data.description ? ` — ${post.data.description}` : ''
		const tags =
			Array.isArray(post.data.tags) && post.data.tags.length
				? ` Tags: ${post.data.tags.join(', ')}`
				: ''
		const content = post.body ? `\n\n${post.body}\n\n` : ''
		return `- [${post.data.title}](${path}) — ${date}${desc}${tags}${content}\n`
	})
	.join('')}

## Contact & Legal Links
- Contact page: ${import.meta.env.SITE}contact
- Terms: ${import.meta.env.SITE}terms

## How to use this file
- This plaintext document is structured for LLM indexing and retrieval. It contains both human-readable sections and a small machine-readable JSON block for quick parsing.
`

export const GET: APIRoute = async () => {
	return new Response(llmsFullTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
