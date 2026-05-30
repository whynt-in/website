// Cloudflare Turnstile CAPTCHA state
export type TurnstileState = {
	turnstileToken: string | null
	isCAPTCHAValidated: boolean
}

export const turnstileState: TurnstileState = {
	turnstileToken: null,
	isCAPTCHAValidated: false
}

// Global widget ID and theme for Turnstile CAPTCHA
let widgetId: string | null = null
let currentTheme: 'light' | 'dark' | null = null

// Detect current theme from document class
function getTheme(): 'light' | 'dark' {
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

// Render Turnstile widget with theme support
function renderTurnstile() {
	const el = document.getElementById('turnstile-container')
	// @ts-ignore -- turnstile is injected globally by external Cloudflare script
	if (!el || !window.turnstile) return

	// Re-render if theme changed or widget doesn't exist
	const nextTheme = getTheme()
	if (widgetId && currentTheme === nextTheme) return

	// Clean up old widget before rendering new one
	if (widgetId) {
		// @ts-ignore -- turnstile is injected globally by external Cloudflare script
		window.turnstile.remove(widgetId)
		widgetId = null
	}

	currentTheme = nextTheme

	// Render Turnstile with callbacks for validation state
	// @ts-ignore -- turnstile is injected globally by external Cloudflare script
	widgetId = window.turnstile.render(el, {
		sitekey: '0x4AAAAAADDwM2QRg3d3Kb7u',
		theme: currentTheme,
		callback: (token: string) => {
			turnstileState.turnstileToken = token
			turnstileState.isCAPTCHAValidated = true
		},
		// Disable submit button on token expiration
		'expired-callback': () => {
			turnstileState.turnstileToken = null
			turnstileState.isCAPTCHAValidated = false
			document.querySelector('button[type="submit"]')?.setAttribute('disabled', 'true')
		},
		size: 'flexible'
	})
}

// Initialize Turnstile when ready
export function initiateTurnstile() {
	if (typeof window === 'undefined') return

	// Poll for Turnstile script availability
	const run = () => {
		const interval = setInterval(() => {
			// @ts-ignore -- turnstile is injected globally by external Cloudflare script
			if (window.turnstile) {
				renderTurnstile()
				clearInterval(interval)
			}
		}, 100)
	}

	// Render on DOM ready or immediately if loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run, { once: true })
	} else {
		run()
	}

	// Watch for dark/light mode toggle and re-render
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

// Cleanup Turnstile widget on page unload
export function destroyTurnstile() {
	// @ts-ignore -- turnstile is injected globally by external Cloudflare script
	if (widgetId && window.turnstile) {
		// @ts-ignore -- turnstile is injected globally by external Cloudflare script
		window.turnstile.remove(widgetId)
		widgetId = null
	}
}
