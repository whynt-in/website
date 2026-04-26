import type { APIRoute } from 'astro'

export const prerender = false

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

		const body = await request.json()

		const { firstName, lastName, email, phone, message } = body

		if (!firstName || !lastName || !email || !message) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Missing required fields 🟡'
				}),
				{ status: 400 }
			)
		}

		// TODO: Store in Database
		console.log('Contact Form Submission: \n', body)

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
