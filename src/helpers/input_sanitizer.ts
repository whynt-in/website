function sanitize(content: string) {
	return content.replace(/@everyone/g, '@\u200beveryone').replace(/@here/g, '@\u200bhere')
}

type SanitizedContent = {
	firstName: string
	lastName: string
	email: string
	phone: string | undefined
	message: string
}

export function sanitizeContent(content: SanitizedContent) {
	content.firstName = sanitize(content.firstName)
	content.lastName = sanitize(content.lastName)
	content.email = sanitize(content.email)
	content.message = sanitize(content.message)

	if (content.phone) {
		content.phone = sanitize(content.phone)
	}

	return content
}
