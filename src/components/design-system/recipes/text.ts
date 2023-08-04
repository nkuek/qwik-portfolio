import { defineRecipe } from '@pandacss/dev';

export const textRecipe = defineRecipe({
  className: 'text',
  description: 'Text styles',
  variants: {
    size: {
      hero: {
        fontSize: '48px',
        letterSpacing: '-0.025em',
        fontWeight: 300,
      },
      title: {
        fontSize: '32px',
        fontWeight: 100,
      },
      subtitle: {
        fontSize: '24px',
        fontWeight: 100,
      },
    },
  },
});
