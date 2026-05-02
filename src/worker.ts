import { RateLimiter } from './durable-objects/rate-limiter'
import astroHandler from '@astrojs/cloudflare/entrypoints/server'
import pgpKey from '../.well-known/pgp-key.txt'
import securityTxt from '../.well-known/security.txt'

// Cloudflare Worker entry point for Astro SSR
// with rate limiting on contact form submissions
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)

		// Security and Vulnerability handling
		if (url.pathname === '/.well-known/pgp-key.txt') {
			return new Response(pgpKey, {
				headers: {
					'content-type': 'text/plain; charset=utf-8'
				}
			})
		} else if (url.pathname === '/.well-known/security.txt') {
			return new Response(securityTxt, {
				headers: {
					'content-type': 'text/plain; charset=utf-8'
				}
			})
		}

		// Rate limit contact form submissions per IP
		if (url.pathname === '/api/contact' && request.method === 'POST') {
			const ip = request.headers.get('CF-Connecting-IP') ?? '127.0.0.1'

			const id = env.RATE_LIMITER.idFromName(ip)
			const limiter = env.RATE_LIMITER.get(id)

			// Check rate limit before processing form
			const limitResponse = await limiter.fetch(new Request('https://rate-limit'))

			if (limitResponse.status === 429) {
				return limitResponse
			}
		}

		// Delegate to Astro handler for main routing
		return astroHandler.fetch(request, env, ctx)
	}
}

export { RateLimiter }
