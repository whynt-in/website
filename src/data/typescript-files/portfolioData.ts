type PortfolioDataType = {
	title: string
	subtitle: string
	image: any
	link: any
}

// Images to be shown on portfolio
import whyntLogoImage from '../../assets/portfolio/whynt-logo.webp'

export const portfolioData: PortfolioDataType[] = [
	{
		title: 'Whynt — Custom Software, Websites & Digital Growth',
		subtitle:
			'Practical software, modern websites, and results-driven marketing that help small and mid-sized businesses scale with reliable execution.',
		image: whyntLogoImage,
		link: 'https://whynt.in/'
	}
]
