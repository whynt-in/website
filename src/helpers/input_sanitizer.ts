/**
 * Replace potentially disruptive mention tokens to prevent accidental pings
 * when content is posted to external services (for example, Discord).
 *
 * This is intentionally conservative: it replaces `@everyone` and `@here`
 * with visually-equivalent tokens that do not trigger mentions.
 */
function sanitize(content: string) {
	return content.replace(/@everyone/g, '@\u200beveryone').replace(/@here/g, '@\u200bhere')
}

/**
 * Shape of the contact form content expected by `sanitizeContent`.
 */
type SanitizedContent = {
	firstName: string
	lastName: string
	email: string
	phone: string | undefined
	message: string
}

/**
 * Sanitize all string fields of a contact form payload in-place.
 *
 * This function mutates the provided object and returns the same reference
 * for convenience. It is safe to call with objects that omit `phone`.
 *
 * @param content - The contact form data to sanitize.
 * @returns The same `content` object with sanitized string fields.
 */
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
