import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { validateTurnstile } from '../../helpers/turnstile_validate'

export const prerender = false

type ContactForm = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	message: string
	turnstileToken: string
}

export const GET = () => {
	return new Response('Method Not Allowed', { status: 405 })
}

export const POST: APIRoute = async ({ request }) => {
	try {
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

		const body = (await request.json()) as ContactForm
		const { firstName, lastName, email, phone, message, turnstileToken } = body

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

		const validationResponse = await validateTurnstile(turnstileToken)
		// @ts-ignore
		if (!validationResponse.success) {
			return new Response(
				JSON.stringify({
					success: false,
					// @ts-ignore
					error: validationResponse.error || 'Invalid CAPTCHA 🤖'
				}),
				{ status: 400 }
			)
		}

		await env.DB.prepare(
			`
			INSERT INTO contact_form_submissions
        	(first_name, last_name, email, phone_number, message)
        	VALUES (?, ?, ?, ?, ?)
		`
		)
			.bind(firstName, lastName, email, phone || null, message)
			.run()

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Message received! 🟢'
			}),
			{ status: 200 }
		)
	} catch (error) {
		// TODO: Log error to monitoring service
		return new Response(
			JSON.stringify({
				success: false,
				error: 'Internal server error 🔴'
			}),
			{ status: 500 }
		)
	}
}
