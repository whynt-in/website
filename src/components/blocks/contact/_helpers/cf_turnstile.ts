export type TurnstileState = {
	turnstileToken: string | null
	isCAPTCHAValidated: boolean
}

export const turnstileState: TurnstileState = {
	turnstileToken: null,
	isCAPTCHAValidated: false
}

let widgetId: string | null = null
let currentTheme: 'light' | 'dark' | null = null

function getTheme(): 'light' | 'dark' {
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function renderTurnstile() {
	const el = document.getElementById('turnstile-container')
	// @ts-ignore
	if (!el || !window.turnstile) return

	const nextTheme = getTheme()
	if (widgetId && currentTheme === nextTheme) return

	if (widgetId) {
		// @ts-ignore
		window.turnstile.remove(widgetId)
		widgetId = null
	}

	currentTheme = nextTheme

	// @ts-ignore
	widgetId = window.turnstile.render(el, {
		sitekey: '0x4AAAAAADDwM2QRg3d3Kb7u',
		theme: currentTheme,
		callback: (token: string) => {
			turnstileState.turnstileToken = token
			turnstileState.isCAPTCHAValidated = true
			document.querySelector('button[type="submit"]')?.removeAttribute('disabled')
		},
		'expired-callback': () => {
			turnstileState.turnstileToken = null
			turnstileState.isCAPTCHAValidated = false
			document.querySelector('button[type="submit"]')?.setAttribute('disabled', 'true')
		}
	})
}

export function initiateTurnstile() {
	if (typeof window === 'undefined') return

	const run = () => {
		const interval = setInterval(() => {
			// @ts-ignore
			if (window.turnstile) {
				renderTurnstile()
				clearInterval(interval)
			}
		}, 100)
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run, { once: true })
	} else {
		run()
	}

	const observer = new MutationObserver(() => {
		const nextTheme = getTheme()
		if (nextTheme !== currentTheme) {
			renderTurnstile()
		}
	})

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class']
	})
}

export function destroyTurnstile() {
	// @ts-ignore
	if (widgetId && window.turnstile) {
		// @ts-ignore
		window.turnstile.remove(widgetId)
		widgetId = null
	}
}
