export const WHYNT_COLOR = 0x1f8a81

export type RequestContext = {
	ip?: string
	userAgent?: string
	url?: string
	method?: string
	referer?: string
}

export type SendDiscordNotificationInput = {
	webhookUrl: string
	title?: string
	name?: string
	email?: string
	phone?: string
	message: string
	footer?: string
	color?: number
	context?: RequestContext
}

function safe(value?: string) {
	return value && value.trim().length > 0 ? value : 'N/A'
}

function truncate(str: string, max: number) {
	return str.length > max ? str.slice(0, max - 3) + '...' : str
}

export async function sendDiscordNotification({
	webhookUrl,
	title = 'New Notification',
	name,
	email,
	phone,
	message,
	footer = 'Whynt Contact Form',
	color = WHYNT_COLOR,
	context
}: SendDiscordNotificationInput): Promise<void> {
	if (!webhookUrl) {
		throw new Error('Missing Discord webhook URL')
	}

	const now = new Date()

	const fields: any[] = [
		{
			name: '👤 Name',
			value: safe(name),
			inline: true
		},
		{
			name: '📧 Email',
			value: safe(email),
			inline: true
		}
	]

	if (phone) {
		fields.push({
			name: '📱 Phone',
			value: phone,
			inline: true
		})
	}

	fields.push({
		name: '💬 Message',
		value: '```' + truncate(message, 1000) + '```'
	})

	if (context) {
		fields.push({
			name: '🌐 Request Context',
			value: [
				`**IP:** ${safe(context.ip)}`,
				`**User-Agent:** ${safe(context.userAgent)}`,
				context.method ? `**Method:** ${context.method}` : null,
				context.url ? `**URL:** ${context.url}` : null,
				context.referer ? `**Referer:** ${context.referer}` : null
			]
				.filter(Boolean)
				.join('\n')
				.slice(0, 1024)
		})
	}

	const payload = {
		embeds: [
			{
				title: `📩 ${title}`,
				color,
				timestamp: now.toISOString(),
				fields,
				footer: {
					text: footer
				}
			}
		]
	}

	const res = await fetch(webhookUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})

	if (!res.ok) {
		const errorText = await res.text().catch(() => '')
		throw new Error(`Discord webhook failed: ${res.status} ${res.statusText} ${errorText}`)
	}
}
