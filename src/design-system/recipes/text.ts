import { defineRecipe } from '@pandacss/dev';

export const textRecipe = defineRecipe({
  className: 'ds-text',
  description: 'Text styles',
  variants: {
    size: {
      hero: {
        fontSize: '48px',
        letterSpacing: '-0.025em',
        fontWeight: 400,
      },
      mobileHero: {
        fontSize: '32px',
        letterSpacing: '-0.025em',
        fontWeight: 400,
      },
      title: {
        fontSize: '32px',
        fontWeight: 400,
      },
      mobileTitle: {
        fontSize: '24px',
        fontWeight: 400,
      },
      subtitle: {
        fontSize: '32px',
        fontWeight: 300,
      },
      mobileSubtitle: {
        fontSize: '24px',
        fontWeight: 300,
        lineHeight: '29px',
      },
      body: {
        fontSize: '20px',
        fontWeight: 300,
        lineHeight: '29px',
      },
      mobileBody: {
        fontSize: '18px',
        fontWeight: 300,
        lineHeight: '26px',
      },
      caption: {
        fontSize: '18px',
        fontWeight: 300,
        lineHeight: '29px',
      },
      mobileCaption: {
        fontSize: '18px',
        fontWeight: 300,
        lineHeight: '26px',
      },
    },
  },
});
