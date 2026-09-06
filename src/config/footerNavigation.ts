// Footer navigation structure with company
// info, category links, and copyright text
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface FooterAbout {
	title: string
	aboutText: string
	logo: Logo
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterColumn {
	category: string
	subCategories: SubCategory[]
}

export interface SubFooter {
	copywriteText: string
}

export interface FooterData {
	footerAbout: FooterAbout
	footerColumns: FooterColumn[]
	subFooter: SubFooter
}

export const footerNavigationData: FooterData = {
	footerAbout: {
		title: 'Whynt',
		aboutText:
			'Made with ❤️ by the Whynt team. We are a small team of passionate developers who are dedicated to creating the best possible experience for our users.',
		logo: {
			src: '/logo.svg',
			alt: 'Whynt Logo',
			text: 'Whynt'
		}
	},
	footerColumns: [
		{
			category: 'Product',
			subCategories: [
				{
					subCategory: 'Pricing',
					subCategoryLink: '/pricing'
				},
				{
					subCategory: 'Features',
					subCategoryLink: '/features'
				},
				{
					subCategory: 'FAQ',
					subCategoryLink: '/faq'
				},
				{
					subCategory: 'Changelog',
					subCategoryLink: '/changelog'
				},
				{
					subCategory: 'Terms',
					subCategoryLink: '/terms'
				}
			]
		},
		{
			category: 'More on Whynt',
			subCategories: [
				{
					subCategory: 'Blog',
					subCategoryLink: '/blog'
				},
				{
					subCategory: 'Portfolio',
					subCategoryLink: '/portfolio'
        },
        {
					subCategory: 'Alliance Program',
					subCategoryLink: '/alliance'
				},
				{
					subCategory: 'Careers',
					subCategoryLink: '/blog'
				}
			]
		},
		{
			category: 'Get in touch',
			subCategories: [
				{
					subCategory: 'Contact page',
					subCategoryLink: '/contact'
				},
				{
					subCategory: 'WhatsApp Business',
					subCategoryLink: 'https://wa.me/919497648580'
				},
				{
					subCategory: 'Give us a call',
					subCategoryLink: 'tel:+919497648580'
				}
			]
		}
	],
	subFooter: {
		copywriteText: '© Whynt 2026.'
	}
}
