/**
 * Neutralizes Discord-style mass-mention tokens in a string.
 *
 * Replaces occurrences of `@everyone` and `@here` with versions that include a zero-width space so they do not trigger mentions.
 *
 * @param content - The input string to sanitize
 * @returns The sanitized string with `@everyone` and `@here` neutralized
 */
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

/**
 * Sanitizes user-provided contact fields in-place to neutralize Discord-style mentions.
 *
 * @param content - The object whose fields will be mutated; `firstName`, `lastName`, `email`, and `message` are always sanitized, and `phone` is sanitized only if present.
 * @returns The same `content` object with its fields sanitized.
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
