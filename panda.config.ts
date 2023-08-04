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
        },
      },
      recipes: {
        text: textRecipe,
      },
    },
  },

  // The output directory for your css system
  outdir: 'src/styled-system',
});
