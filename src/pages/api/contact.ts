import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { validateTurnstile } from '../../helpers/turnstile_validate'
import { sendDiscordNotification } from '../../helpers/discord_webhook'

// Disable pre-rendering for dynamic API endpoint
export const prerender = false

// Contact form submission structure
type ContactForm = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	message: string
	turnstileToken: string
}

// Only POST method allowed for form submissions
export const GET = () => {
	return new Response('Method Not Allowed', { status: 405 })
}

// Process contact form submission with validation
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
			firstName,
			lastName,
			email,
			phone,
			message
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
