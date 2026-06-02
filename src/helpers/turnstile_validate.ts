import { env } from 'cloudflare:workers'

/**
 * Validate a Cloudflare Turnstile token server-side.
 *
 * Sends the provided user response token to Cloudflare's Turnstile
 * verification endpoint together with the secret key from environment
 * variables. Returns the parsed JSON response from Cloudflare which
 * typically contains at least a `success` boolean and diagnostic fields.
 *
 * @param token - The Turnstile response token provided by the client.
 * @returns A promise resolving to the verification result object returned
 *          by Cloudflare (shape depends on the service: includes `success`).
 */
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
		console.error('Error processing CAPTCHA: ', error)
		return { success: false, error: 'CAPTCHA failed 🤖' }
	}
}
