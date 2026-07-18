import type { ImageMetadata } from 'astro'

type AllianceDataType = {
	title: string
	subtitle: string
	image: ImageMetadata
	link: string
}

// Images to be shown on alliances page
import teenSquad from '../../assets/alliances/teensquad-icon.webp'

export const alliancesData: Array<Array<AllianceDataType>> = [
	[
		{
			title: 'Teen Squad | Youth Tech Initiative',
			subtitle:
				'Teen Squad is a youth-led technology and innovation community founded by Sidharth S (Zidhuxd) in Kerala, India. It empowers teenagers through coding, cybersecurity, technology learning, and social impact initiatives.',
			image: teenSquad,
			link: 'https://teensquad.tech/'
		}
	]
]
