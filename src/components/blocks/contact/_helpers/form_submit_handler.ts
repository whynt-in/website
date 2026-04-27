import type { TurnstileState } from './cf_turnstile'
import { setModalState } from './modal_manager'

type ContactApiResponse = {
	success: boolean
	message: string
	error: string
}

export function addContactFormSubmitListener(turnstileState: TurnstileState) {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		throw new Error('addContactFormSubmitListener can only be called in a browser environment')
	}
	const form = document.getElementById('contactForm')! as HTMLFormElement
	form.addEventListener('submit', (event) => {
		event.preventDefault()

		if (!turnstileState.turnstileToken || !turnstileState.isCAPTCHAValidated) {
			handleIllegalSubmission(true)
			return
		}

		handleIllegalSubmission(false)

		const data = Object.fromEntries(new FormData(form).entries())
		data['turnstileToken'] = turnstileState.turnstileToken

		fetchContactApi(data)
	})
}

function handleIllegalSubmission(isIllegalSubmission: boolean) {
	setModalState({
		isOpen: true,
		loadingElementVisible: !isIllegalSubmission,
		title: !isIllegalSubmission ? 'Sending your message...' : 'Invalid CAPTCHA 🤖',
		description: !isIllegalSubmission
			? ''
			: 'Please complete the CAPTCHA in order to submit the form.',
		buttonVisible: isIllegalSubmission
	})
}

function fetchContactApi(formData: Record<string, FormDataEntryValue>) {
	fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})
		.then((response) => response.json() as Promise<ContactApiResponse>)
		.then((result) => {
			setModalState({
				isOpen: true,
				loadingElementVisible: false,
				title: result.message || result.error,
				description: result.success
					? 'Thank you for contacting Whynt. We will get back to you as soon as possible.'
					: 'Oops! Something went wrong. Please try again later.',
				buttonVisible: true
			})
		})
		.catch((error) => {
			setModalState({
				isOpen: true,
				loadingElementVisible: false,
				title: 'Network Error 🔌',
				description:
					'Unable to submit the form. Please check your internet connection and try again.',
				buttonVisible: true
			})
			console.error('Error submitting contact form:', error)
		})
}
