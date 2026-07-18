import type { ImageMetadata } from 'astro'

type PortfolioDataType = {
	title: string
	subtitle: string
	image: ImageMetadata
	link: string
}

// Images to be shown on portfolio
import whyntLogoImage from '../../assets/portfolio/whynt-logo.webp'

export const portfolioData: Array<Array<PortfolioDataType>> = [
	[
		{
			title: 'Whynt — Custom Software, Websites & Digital Growth',
			subtitle:
				'Practical software, modern websites, and results-driven marketing that help small and mid-sized businesses scale with reliable execution.',
			image: whyntLogoImage,
			link: 'https://whynt.in/'
		}
	]
]
