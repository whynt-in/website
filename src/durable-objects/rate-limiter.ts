export class RateLimiter {
	state: DurableObjectState

	constructor(state: DurableObjectState) {
		this.state = state
	}

	async fetch(_request: Request): Promise<Response> {
		const now = Date.now()

		const WINDOW_MS = 24 * 60 * 60 * 1000
		const LIMIT = 5

		try {
			await this.state.storage.transaction(async (txn) => {
				let timestamps = (await txn.get<number[]>('timestamps')) || []

				timestamps = timestamps.filter((ts) => now - ts < WINDOW_MS)

				if (timestamps.length >= LIMIT) {
					throw new Error('RATE_LIMIT')
				}

				timestamps.push(now)

				// Safety cap
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
