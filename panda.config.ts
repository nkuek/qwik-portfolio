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

  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          poppins: { value: 'Poppins, sans-serif' },
          sourceCodePro: { value: 'Source Code Pro, monospace' },
          firaCode: { value: 'Fira Code, monospace' },
        },
      },
      recipes: {
        text: textRecipe,
      },
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.neutral.900}',
              _light: '{colors.stone.50}',
            },
          },

          text: {
            value: {
              base: '{colors.stone.50}',
              _light: '{colors.neutral.900}',
            },
          },
          caption: {
            value: {
              base: '{colors.stone.300}',
              _light: '{colors.neutral.600}',
            },
          },
          inlineCode: {
            value: {
              base: '{colors.neutral.600}',
              _light: '{colors.neutral.300}',
            },
          },
        },
        assets: {
          backgroundImage: {
            value: {
              base: `-webkit-linear-gradient(
                top,
                rgba(23, 24, 32, 0.95),
                rgba(23, 24, 32, 0.95)
                ),
                url('/images/overlay.png')`,
              _light: `-webkit-linear-gradient(
                top,
                rgba(255, 255, 255, 0.95),
                rgba(255, 255, 255, 0.95)
                ),
                url('/images/overlay.png')`,
            },
          },
        },
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
        buttonShowcase: {
          '25%, 75%': {
            transform: 'translateX(0) rotate(-180deg)',
          },
        },
        scaleColorBar: {
          '50%': {
            strokeWidth: '200vh',
          },
        },
        revealLeftToRight: {
          from: {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
          },
          to: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        revealRightToLeft: {
          from: {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          },
          to: {
            clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'src/styled-system',
});
