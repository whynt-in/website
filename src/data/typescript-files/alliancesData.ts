import type { ImageMetadata } from 'astro'

type AllianceDataType = {
	title: string
	subtitle: string
	image: ImageMetadata
	link: string
}

// Images to be shown on alliances page
import teenSquad from '../../assets/alliances/teensquad-icon.webp'
import luucesse from '../../assets/alliances/luucesse-logo.webp'

export const alliancesData: Array<Array<AllianceDataType>> = [
	[
		{
			title: 'Luucesse | Content • Ads • Leads',
			subtitle:
				'Luucesse is a digital marketing agency that specializes in content creation, advertising, and lead generation.',
			image: luucesse,
			link: 'https://www.instagram.com/luucesse/'
		}
	],
	[
		{
			title: 'Teen Squad | Youth Tech Initiative',
			subtitle:
				'Teen Squad is a youth-led technology and innovation community in Kerala, India. It empowers teenagers through coding, cybersecurity, technology learning, and social impact initiatives.',
			image: teenSquad,
			link: 'https://teensquad.tech/'
		}
	]
]
