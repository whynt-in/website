import { env } from 'cloudflare:workers'

export async function validateTurnstile(token: string) {
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				secret: env.TURNSTILE_SECRET_KEY,
				response: token
			})
		})
		const result = await response.json()
		return result
	} catch (error) {
		return { success: false, error: 'CAPTCHA failed 🤖' }
	}
}
