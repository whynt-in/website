export type TurnstileState = {
	turnstileToken: string | null
	isCAPTCHAValidated: boolean
}

export const turnstileState: TurnstileState = {
	turnstileToken: null,
	isCAPTCHAValidated: false
}

export function initiateTurnstile() {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		throw new Error('initiateTurnstile can only be called in a browser environment')
	}
	window.addEventListener('load', () => {
		// @ts-ignore
		turnstile.render('#turnstile-container', {
			sitekey: '0x4AAAAAADDwM2QRg3d3Kb7u',
			callback: (token: string) => {
				turnstileState.turnstileToken = token
				turnstileState.isCAPTCHAValidated = true
				document.querySelector('button[type="submit"]')?.removeAttribute('disabled')
			}
		})
	})
}
