import type { ImageMetadata } from 'astro'

type AllianceDataType = {
	title: string
	subtitle: string
	image: ImageMetadata
	link: string
}

// Images to be shown on alliances page
import luucesse from '../../assets/alliances/luucesse-logo.webp'

export const alliancesData: Array<Array<AllianceDataType>> = [
	[
		{
			title: 'Luucesse | Content • Ads • Leads',
			subtitle:
				'Luucesse is a digital marketing agency that specializes in content creation, advertising, and lead generation.',
			image: luucesse,
			link: 'https://luucesse.whynt.in/'
		}
	]
]
