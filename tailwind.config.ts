import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          primary: '#9B1B30',
          dark: '#7B0A24',
          light: '#C41E3A',
          gold: '#D4A574',
          cream: '#FFF5F0',
          text: '#5C2018',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"STSong"', '"SimSun"', 'serif'],
        sans: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
