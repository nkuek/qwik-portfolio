import { defineConfig } from '@pandacss/dev';
import { textRecipe } from './src/components/design-system/recipes/text';

export default defineConfig({
  jsxFramework: 'qwik',

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          roboto: { value: 'Roboto, Helvetica, sans-serif' },
          sourceCodePro: { value: 'Source Code Pro, monospace' },
        },
      },
      recipes: {
        text: textRecipe,
      },
      keyframes: {
        blink: {
          '0%, 50%': {
            opacity: 1,
          },
          '60%': {
            opacity: 0,
          },
          '70%, 100%': {
            opacity: 1,
          },
        },
        type: {
          '0%': {
            left: 0,
          },
          '40%, 75%': {
            left: '100%',
          },
          '100%': {
            left: 0,
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'src/styled-system',
});
