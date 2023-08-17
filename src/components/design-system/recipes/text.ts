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
      mobileHero: {
        fontSize: '32px',
        letterSpacing: '-0.025em',
        fontWeight: 300,
      },
      title: {
        fontSize: '32px',
        fontWeight: 300,
      },
      mobileTitle: {
        fontSize: '24px',
        fontWeight: 300,
      },
      subtitle: {
        fontSize: '32px',
        fontWeight: 300,
      },
      mobileSubtitle: {
        fontSize: '24px',
        fontWeight: 300,
      },
      body: {
        fontSize: '20px',
        fontWeight: 300,
      },
      mobileBody: {
        fontSize: '16px',
        fontWeight: 300,
      },
    },
  },
});
