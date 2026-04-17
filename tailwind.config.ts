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
    		colors: {
    			fill: {
    				'1': 'rgba(255, 255, 255, 0.10)'
    			},
    			green: {
    				'50':  '#f0fdf4',
    				'100': '#dcfce7',
    				'500': '#22c55e',
    				'600': '#16a34a',
    				'700': '#15803d',
    				'900': '#14532d',
    				'1000': '#052e16'
    			},
    			brown: {
    				'500': '#d97706',
    			},
    			black: {
    				'1': '#0f172a',
    				'2': '#334155'
    			},
    			gray: {
    				'25':  '#fafafa',
    				'200': '#e2e8f0',
    				'300': '#cbd5e1',
    				'500': '#64748b',
    				'600': '#475569',
    				'700': '#334155',
    				'900': '#0f172a'
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
    			'bank-gradient': 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
    			'bank-green-gradient': 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #15803d 100%)',
    			'hero-gradient': 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
    		},
    		boxShadow: {
    			form: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    			chart: '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
    			profile: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    			creditCard: '8px 10px 16px 0px rgba(0, 0, 0, 0.05)'
    		},
    		fontFamily: {
    			inter: 'var(--font-inter)',
    			robo: 'var(--font-robo)',
				dancing: 'var(--font-dancing)',
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
