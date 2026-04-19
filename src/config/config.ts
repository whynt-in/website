// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: "Whynt — Custom Software That Scales With Your Business",
	siteDescription:
		"Whynt builds and maintains custom software, websites, and integrations for businesses that need reliable, scalable systems.",
	ogImage: '/og.jpg',
	logo: {
		src: '/logo.svg',
		alt: 'Whynt. logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}
