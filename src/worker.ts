import { RateLimiter } from './durable-objects/rate-limiter'
import astroHandler from '@astrojs/cloudflare/entrypoints/server'
import pgpKey from '../.well-known/pgp-key.txt'
import securityTxt from '../.well-known/security.txt'

/**
 * Environment bindings expected by the worker.
 *
 * The `RATE_LIMITER` namespace is typed permissively to avoid build-time
 * coupling to Cloudflare's types while preserving runtime behavior.
 */
interface Env {
	RATE_LIMITER: any
	DB?: any
	ASSETS?: any
	PUBLIC_GA_TRACKING_ID?: string
	PUBLIC_GTM_ID?: string
}

/**
 * Cloudflare Worker entry point for Astro SSR with additional routing
 * conveniences and a pre-check for rate-limited endpoints.
 *
 * The exported default object implements the Cloudflare Workers fetch handler
 * which delegates most requests to the Astro server entry point but performs
 * small preflight checks for well-known files and enforces per-IP rate
 * limiting on `/api/contact` POST requests by delegating to the
 * `RateLimiter` durable object.
 */
export default {
	async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
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
			let limitResponse: Response | undefined
			try {
				limitResponse = await limiter.fetch(new Request('https://rate-limit'))
			} catch (error) {
				_rateLimiterFallbackCount += 1
				console.error('Rate limiter check failed; allowing request through', error)
			}

			if (limitResponse?.status === 429) {
				return limitResponse
			}
		}

		// Delegate to Astro handler for main routing
		return astroHandler.fetch(request, env as any, ctx)
	}
}

let _rateLimiterFallbackCount = 0

export { RateLimiter }
