import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xxs: '350px',
      },
      colors: {
        'cocos-50': '#eff6ff',
        'cocos-100': '#dbeafe',
        'cocos-200': '#bfd8fd',
        'cocos-300': '#93c4f9',
        'cocos-400': '#60a7f4',
        'cocos-500': '#3b8df1',
        'cocos-600': '#0062E1', // cocosBlue
        'cocos-700': '#004b97',
        'cocos-800': '#003572',
        'cocos-900': '#002C65', // cocosDarkBlue
        'cocos-950': '#001739',
        'cocos-gold': '#FFD700',
        'cocos-gold-hover': '#FFEA40',
        'cocos-green': '#00E079',

        // shadcn/ui variables
        muted: '#52525b',
        'muted-foreground': '#52525b',
        card: '#3cff00',
        'card-foreground': '#3cff00',
        popover: '#3cff00',
        'popover-background': '#3cff00',
        border: '#3cff00',
        input: '#0062E1',
        primary: '#0062E1',
        'primary-foreground': '#ffffff',
        secondary: '#002C65',
        'secondary-foreground': '#ffffff',
        accent: '#f4f4f5',
        'accent-foreground': '#001739',
        destructive: '#E10028',
        'destructive-foreground': '#ffffff',
        ring: '#000000',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
