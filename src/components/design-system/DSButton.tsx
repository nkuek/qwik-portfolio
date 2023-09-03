import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx } from '@styles/css';
import { button } from '@styles/recipes';

export type DSButtonPropsBase = {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'big' | 'small';
  class?: string;
};

type DSButtonProps = Omit<QwikIntrinsicElements['button'], 'class'> &
  DSButtonPropsBase;

/**  PandaCSS requires classes to be set at runtime, so we need to explicitly set the button type we want instead of just passing in the variant directly */
export function getButtonClassFromVariant(
  variant: DSButtonPropsBase['variant'],
  size: DSButtonPropsBase['size']
) {
  switch (variant) {
    case 'primary': {
      switch (size) {
        case 'big':
          return button({
            type: 'primary',
            size: { base: 'small', md: 'big' },
          });
        case 'small':
          return button({ type: 'primary', size: 'small' });
      }
      break;
    }
    case 'secondary': {
      switch (size) {
        case 'big':
          return button({
            type: 'secondary',
            size: { base: 'small', md: 'big' },
          });
        case 'small':
          return button({ type: 'secondary', size: 'small' });
      }
      break;
    }
    case 'tertiary': {
      switch (size) {
        case 'big':
          return button({
            type: 'tertiary',
            size: { base: 'small', md: 'big' },
          });
        case 'small':
          return button({ type: 'tertiary', size: 'small' });
      }
    }
  }
}

export const DSButton = component$(
  ({
    variant,
    class: classExtension,
    size = 'big',
    ...props
  }: DSButtonProps) => {
    const buttonClass = getButtonClassFromVariant(variant, size);
    return (
      <button class={cx(buttonClass, classExtension)} {...props}>
        <Slot />
      </button>
    );
  }
);
