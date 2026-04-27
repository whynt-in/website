import { RateLimiter } from './durable-objects/rate-limiter'
import astroHandler from '@astrojs/cloudflare/entrypoints/server'

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)

		if (url.pathname === '/api/contact' && request.method === 'POST') {
			const ip = request.headers.get('CF-Connecting-IP') ?? '127.0.0.1'

			const id = env.RATE_LIMITER.idFromName(ip)
			const limiter = env.RATE_LIMITER.get(id)

			const limitResponse = await limiter.fetch(new Request('https://rate-limit'))

			if (limitResponse.status === 429) {
				return limitResponse
			}
		}

		return astroHandler.fetch(request, env, ctx)
	}
}

export { RateLimiter }
