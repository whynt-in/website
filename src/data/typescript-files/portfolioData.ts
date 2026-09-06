import type { ImageMetadata } from 'astro'

type PortfolioDataType = {
	title: string
	subtitle: string
	image: ImageMetadata
	link: string
}

// Images to be shown on portfolio
import irysEventsLogoImage from '../../assets/portfolio/irys-logo.webp'

export const portfolioData: Array<Array<PortfolioDataType>> = [
	[
		{
			title: 'Irys Event Planners — Luxury Event Planning',
			subtitle: 'Premium event planning services for the most discerning clients.',
			image: irysEventsLogoImage,
			link: 'https://iryseventplanners.com/'
		}
	]
]
