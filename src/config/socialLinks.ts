// Social media links configuration
// for footer and social proof sections

export interface SocialLink {
	name: string
	link: string
	icon: string
}

export const socialLinks: SocialLink[] = [
	{
		name: 'instagram',
		link: 'https://www.instagram.com/whynt.in/',
		icon: 'proicons-instagram'
	},
	{
		name: 'github',
		link: 'https://github.com/whynt-in',
		icon: 'github'
	},
	{
		name: 'linkedin',
		link: 'https://www.linkedin.com/company/whynt/',
		icon: 'basil-linkedin-solid'
	},
	{
		name: 'gitlab',
		link: 'https://gitlab.com/whynt',
		icon: 'proicons-gitlab'
	}
]
