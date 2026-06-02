import { env } from 'cloudflare:workers'

/**
 * Payload for Discord webhook notifications triggered by contact form submissions.
 */
type DiscordWebhookPayload = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	message: string
}

/**
 * Send a formatted notification to a Discord webhook.
 *
 * If `DISCORD_WEBHOOK_URL` is not configured the function is a no-op and will
 * log a warning. The payload is formatted as a readable message containing
 * the submitter's name, email, optional phone number and message body.
 *
 * @param payload - The contact form data to include in the notification.
 * @returns A promise that resolves once the webhook request completes. Errors
 *          are caught and logged; this function does not throw for network
 *          failures to avoid taking down the primary request flow.
 */
export async function sendDiscordNotification(payload: DiscordWebhookPayload) {
	const webhookUrl = env.DISCORD_WEBHOOK_URL
	if (!webhookUrl) {
		console.warn('Discord webhook URL is not configured. Skipping notification.')
		return
	}

	try {
		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: [
					'**New Contact Form Submission 🥳**',
					`**🗓️ Date:** ${new Date().toLocaleString('en-GB', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
						timeZone: 'Asia/Kolkata'
					})}`,
					'',
					`**👤 Name:** ${payload.firstName} ${payload.lastName}`,
					`**✉️ Email:** ${payload.email}`,
					payload.phone ? `**☎️ Phone:** ${payload.phone}` : null,
					'**💬 Message:**',
					'',
					payload.message
				].join('\n'),
				allowed_mentions: {
					parse: []
				}
			})
		})

		if (!response.ok) {
			console.error('Failed to send Discord notification:', response.statusText)
		}
	} catch (error) {
		console.error('Failed to send Discord notification:', error)
	}
}
