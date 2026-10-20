/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['selector'],
	safelist: [
		{
			pattern: /col-span-(\d+)/,
			variants: ['lg']
		},
		// Height
		{
			pattern: /h-(0|2|3|4|6|8|12|16|24|32)/,
			variants: ['lg']
		},
		// Text sizes for all screen sizes
		{
			pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
			variants: ['lg']
		},
		// Font weights
		{
			pattern: /font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/
		},
		// Alignments
		{
			pattern: /text-(left|center|right)/
		}
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				primary: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
					950: '#022c22'
				},
				neutral: {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0a0a0a'
				}
			},
			cursor: {
				fancy: 'url(https://www.svgrepo.com/show/269/color-picker.svg)'
			},
			fontFamily: {
				sans: ['Roboto Variable', ...defaultTheme.fontFamily.sans],
				headings: ['Roboto Slab Variable', ...defaultTheme.fontFamily.sans]
			},
			keyframes: {
				dropdown: {
					'0%': { transform: 'translateY(-1rem)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				},
				fadeInShadowLight: {
					'100%': {
						boxShadow:
							'0 20px 25px -5px rgba(15, 23, 42, .025), 0 8px 10px -6px rgba(15, 23, 42, .025);'
					}
				},
				fadeInShadowDark: {
					'100%': {
						boxShadow: '0 20px 25px -5px rgba(2, 6, 23, .25), 0 8px 10px -6px rgba(2, 6, 23, .25);'
					}
				},
				fadeUp: {
					'0%': { transform: 'translateY(1rem)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				}
			},
			animation: {
				dropdown: 'dropdown 300ms ease-in-out forwards',
				fadeInShadowLight: 'fadeInShadowLight 500ms ease-in-out forwards',
				fadeInShadowDark: 'fadeInShadowDark 500ms ease-in-out forwards',
				fadeUp: 'fadeUp 500ms ease-in-out forwards'
			}
		}
	},
	variants: {
		animation: ['responsive']
	},
	plugins: [
		typography,
		plugin(function ({ addVariant }) {
			addVariant('dark-me', '.dark_&')
		})
	]
}
