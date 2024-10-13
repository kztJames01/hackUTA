import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./constants/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontSize: {
				'4xl': '2.25rem',  // 36px
				'5xl': '3rem',     // 48px
				'6xl': '3.75rem',   // 60px
				'7xl': '4.5rem',    // 72px
				'8xl': '6rem',      // 96px
				'9xl': '8rem',      // 128px
				'10xl': '10rem',    // 160px
			},
			colors: {
				fill: {
					'1': 'rgba(255, 255, 255, 0.10)'
				},
				bankGradient: '#009688',
				indigo: {
					'500': '#6172F3',
					'700': '#3538CD'
				},
				success: {
					'25': '#F6FEF9',
					'50': '#ECFDF3',
					'100': '#D1FADF',
					'600': '#039855',
					'700': '#027A48',
					'900': '#054F31'
				},
				pink: {
					'25': '#FEF6FB',
					'100': '#FCE7F6',
					'500': '#EE46BC',
					'600': '#DD2590',
					'700': '#C11574',
					'900': '#851651'
				},
				blue: {
					'25': '#F5FAFF',
					'100': '#D1E9FF',
					'500': '#2E90FA',
					'600': '#1570EF',
					'700': '#175CD3',
					'900': '#194185'
				},
				sky: {
					'1': '#F3F9FF'
				},
				black: {
					'1': '#00214F',
					'2': '#344054'
				},
				gray: {
					'25': '#FCFCFD',
					'200': '#EAECF0',
					'300': '#D0D5DD',
					'500': '#667085',
					'600': '#475467',
					'700': '#344054',
					'900': '#101828'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				'bank-gradient': 'linear-gradient(45deg, #009688 0%, #4893FF 100%)',
				'bank-green-gradient': 'linear-gradient(90deg, #01797A 0%, #489399 100%)'
			},
			boxShadow: {
				form: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
				chart: '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
				profile: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
				creditCard: '8px 10px 16px 0px rgba(0, 0, 0, 0.05)'
			},
			fontFamily: {
				inter: 'var(--font-inter)',
				robo: 'var(--font-robo)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
