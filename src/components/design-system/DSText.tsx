import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx } from '@styles/css';
import { text } from '@styles/recipes';

type DSTextSizes = 'hero' | 'title' | 'subtitle' | 'body' | 'caption';

export type DSTextProps = {
  size: DSTextSizes;
  tag?: keyof HTMLElementTagNameMap;
  class?: string;
} & QwikIntrinsicElements['div'];

/**  PandaCSS requires classes to be set at runtime, so we need to explicitly set the font styles we want instead of just passing in the variant directly */
function getClass(size: DSTextSizes) {
  switch (size) {
    case 'body':
      return text({
        size: {
          base: 'mobileBody',
          md: 'body',
        },
      });
    case 'hero':
      return text({
        size: {
          base: 'mobileHero',
          md: 'hero',
        },
      });
    case 'caption':
      return text({
        size: {
          base: 'mobileCaption',
          md: 'caption',
        },
      });
    case 'title':
      return text({
        size: {
          base: 'mobileTitle',
          md: 'title',
        },
      });
    case 'subtitle':
      return text({
        size: {
          base: 'mobileSubtitle',
          md: 'subtitle',
        },
      });
  }
}

export const DSText = component$(
  ({ size, class: classExtension, tag = 'span', ...props }: DSTextProps) => {
    const textClass = getClass(size);
    const TagComponent = tag;
    return (
      <TagComponent class={cx(textClass, classExtension)} {...props}>
        {/* children prop from QwikIntrinsicElements is incorrectly typed for now */}
        {/* @ts-ignore */}
        <Slot />
      </TagComponent>
    );
  }
);
