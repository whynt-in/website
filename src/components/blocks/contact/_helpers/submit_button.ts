export function updateSubmitButtonState(turnstileValid: boolean) {
	const submitButton = document.querySelector<HTMLButtonElement>('button[type="submit"]')

	if (!submitButton) return

	const form = submitButton.form
	if (!form) return

	const textArea = form.querySelector<HTMLTextAreaElement>('textarea')

	const isValid =
		form.checkValidity() && !!textArea && textArea.value.length <= 1024 && turnstileValid

	submitButton.disabled = !isValid
}
