// Cloudflare Durable Object for rate limiting
// Enforces per-IP request limits on contact form

interface Transaction {
	get(key: string): Promise<any>
	put(key: string, value: any): Promise<void>
}

interface DurableObjectState {
	storage: {
		transaction(callback: (txn: Transaction) => Promise<void>): Promise<void>
	}
}

export class RateLimiter {
	state: DurableObjectState

	constructor(state: DurableObjectState) {
		this.state = state
	}

	async fetch(_request: Request): Promise<Response> {
		const now: number = Date.now()

		// 24 hour window with max 5 submissions per IP
		const WINDOW_MS: number = 24 * 60 * 60 * 1000
		const LIMIT: number = 5

		try {
			// Atomic transaction for rate limit check
			await this.state.storage.transaction(async (txn: Transaction): Promise<void> => {
				// Get timestamps of past requests
				let timestamps: number[] = ((await txn.get('timestamps')) as number[] | undefined) || []

				// Keep only requests within the time window
				timestamps = timestamps.filter((ts: number): boolean => now - ts < WINDOW_MS)

				// Reject if limit exceeded, else add current request
				if (timestamps.length >= LIMIT) {
					throw new Error('RATE_LIMIT')
				}

				timestamps.push(now)

				// Cap storage size by keeping last 20 timestamps
				if (timestamps.length > 20) {
					timestamps = timestamps.slice(-20)
				}

				await txn.put('timestamps', timestamps)
			})

			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		} catch (err) {
			if (err instanceof Error && err.message === 'RATE_LIMIT') {
				return new Response(
					JSON.stringify({
						success: false,
						error: 'Daily limit exceeded ⏰'
					}),
					{
						status: 429,
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}

			console.error('Error in Rate Limiter: ', err)

			return new Response(
				JSON.stringify({
					success: false,
					error: 'Internal server error 🔴'
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			)
		}
	}
}
