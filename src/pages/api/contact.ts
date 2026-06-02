import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { validateTurnstile } from '../../helpers/turnstile_validate'
import { sendDiscordNotification } from '../../helpers/discord_webhook'
import { sanitizeContent } from '../../helpers/input_sanitizer'

/**
 * API endpoint for contact form submissions.
 *
 * This module exposes a `POST` handler that validates incoming JSON payloads,
 * checks a Cloudflare Turnstile token, sanitizes user input, persists the
 * submission to the configured `DB`, and emits a Discord notification. A
 * `GET` handler returns `405 Method Not Allowed` to indicate the endpoint
 * only accepts `POST` requests.
 */

// Disable pre-rendering for dynamic API endpoint
export const prerender = false

/**
 * Shape of the expected contact form submission body.
 */
type ContactForm = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	message: string
	turnstileToken: string
}

/**
 * Respond to unsupported GET requests for this route.
 * @returns A `405 Method Not Allowed` response.
 */
export const GET = () => {
	return new Response('Method Not Allowed', { status: 405 })
}

/**
 * Handle contact form `POST` submissions.
 *
 * Validates content type and required fields, verifies the Turnstile token,
 * sanitizes fields to avoid accidental mentions, persists the record to the
 * configured database, and posts a notification to Discord. Errors are
 * returned as structured JSON responses with appropriate HTTP status codes.
 */
export const POST: APIRoute = async ({ request }) => {
	try {
		// Validate request content type
		const contentType = request.headers.get('content-type')
		if (!contentType?.includes('application/json')) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Invalid content type 🔴'
				}),
				{ status: 400 }
			)
		}

		// Parse and extract form data
		const body = (await request.json()) as ContactForm
		const { firstName, lastName, email, phone, message, turnstileToken } = body

		// Check required fields (phone is optional)
		if (!firstName || !lastName || !email || !message) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Missing required fields 🟡'
				}),
				{ status: 400 }
			)
		} else if (!turnstileToken) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Missing Turnstile token 🤖'
				}),
				{ status: 400 }
			)
		}

		// Verify CAPTCHA token with Cloudflare Turnstile
		const validationResponse = await validateTurnstile(turnstileToken)
		// @ts-ignore: unknown type from validateTurnstile
		if (!validationResponse.success) {
			return new Response(
				JSON.stringify({
					success: false,
					// @ts-ignore: unknown type from validateTurnstile
					error: validationResponse.error || 'Invalid CAPTCHA 🤖'
				}),
				{ status: 400 }
			)
		}

		// Sanitize content before core operations
		const sanitizedData = sanitizeContent({
			firstName,
			lastName,
			email,
			phone,
			message
		})

		// Save submission to database
		await env.DB.prepare(
			`
			INSERT INTO contact_form_submissions
        	(first_name, last_name, email, phone_number, message)
        	VALUES (?, ?, ?, ?, ?)
		`
		)
			.bind(firstName, lastName, email, phone || null, message)
			.run()

		// Write to Discord webhook for notifications
		await sendDiscordNotification({
			firstName: sanitizedData.firstName,
			lastName: sanitizedData.lastName,
			email: sanitizedData.email,
			phone: sanitizedData.phone,
			message: sanitizedData.message
		})

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Message received! 🟢'
			}),
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error processing contact form submission:', error)
		return new Response(
			JSON.stringify({
				success: false,
				error: 'Internal server error 🔴'
			}),
			{ status: 500 }
		)
	}
}
