import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'text',
  description: 'Text styles',
  base: {
    textAlign: 'center',
    color: 'inherit',
  },
  variants: {
    type: {
      primary: {
        background: 'teal.600',
        transition: 'background 250ms ease',
        _hover: {
          background: 'teal.700',
        },
        padding: '12px 24px',
        borderRadius: '12px',
      },
      secondary: {
        transition: 'color 250ms ease',
        border: '1px solid',
        _hover: {
          color: 'teal.700',
        },
        _disabled: {
          opacity: 0.5,
          background: 'neutral.600',
        },
        padding: '12px 24px',
        borderRadius: '12px',
      },
      tertiary: {
        background: 'teal.950',
        padding: '6px 12px',
        borderRadius: '6px',
        color: 'stone.50',
        _hover: {
          background: 'teal.900',
        },
      },
    },
  },
});
