import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        'urban': {
          'darkslate': '#2F4F4F',  // Dark Slate Gray
          'dim': '#696969',         // Dim Gray
          'slate': '#708090',       // Slate Gray
          'lightslate': '#778899',  // Light Slate Gray
          'indigo': '#4B0082',      // Indigo
        },
      },
      backgroundColor: {
        'urban-primary': '#2F4F4F',
        'urban-secondary': '#696969',
        'urban-tertiary': '#708090',
        'urban-light': '#778899',
        'urban-accent': '#4B0082',
      },
      textColor: {
        'urban-primary': '#2F4F4F',
        'urban-secondary': '#696969',
        'urban-tertiary': '#708090',
        'urban-light': '#778899',
        'urban-accent': '#4B0082',
      },
      borderColor: {
        'urban-primary': '#2F4F4F',
        'urban-secondary': '#696969',
        'urban-tertiary': '#708090',
        'urban-light': '#778899',
        'urban-accent': '#4B0082',
      },
    },
  },
} satisfies Config
