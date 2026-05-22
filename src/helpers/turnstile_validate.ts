import { env } from 'cloudflare:workers'

// Validate Turnstile CAPTCHA token with Cloudflare
export async function validateTurnstile(token: string) {
	try {
		// POST token to Cloudflare for server-side verification
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			// Include secret key and user response token
			body: JSON.stringify({
				secret: env.TURNSTILE_SECRET_KEY,
				response: token
			})
		})
		const result = await response.json()
		return result
	} catch (error) {
		console.error("Error processing CAPTCHA: ", error)
		return { success: false, error: 'CAPTCHA failed 🤖' }
	}
}
