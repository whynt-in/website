// Modal state interface for form feedback display
export type ModalState = {
	isOpen: boolean
	loadingElementVisible: boolean
	title: string
	description: string
	buttonVisible: boolean
}

// Cache DOM elements for modal and its content
export const modalElements = {
	modal: document.getElementById('accessory-modal')!,
	loading: document.querySelector('div.modal__loader')!,
	title: document.querySelector('h2.modal__title')!,
	description: document.querySelector('div.modal__inner_text')!,
	backHomeButton: document.querySelector('div.modal__inner_button')!
}

export function setModalState(state: ModalState) {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		throw new Error('setModalState can only be called in a browser environment')
	}

	// Update modal visibility and content state
	modalElements.modal.classList.toggle('open', state.isOpen)
	modalElements.loading.classList.toggle('hidden', !state.loadingElementVisible)
	modalElements.title.textContent = state.title
	modalElements.description.textContent = state.description
	modalElements.backHomeButton.classList.toggle('hidden', !state.buttonVisible)
}
