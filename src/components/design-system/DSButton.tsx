import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx } from '@styles/css';
import { button } from '@styles/recipes';

export type DSButtonPropsBase = {
  variant: 'primary' | 'secondary' | 'tertiary';
  class?: string;
};

type DSButtonProps = Omit<QwikIntrinsicElements['button'], 'class'> &
  DSButtonPropsBase;

/**  PandaCSS requires classes to be set at runtime, so we need to explicitly set the button type we want instead of just passing in the variant directly */
export function getButtonClassFromVariant(
  variant: DSButtonPropsBase['variant']
) {
  switch (variant) {
    case 'primary':
      return button({ type: 'primary' });
    case 'secondary':
      return button({ type: 'secondary' });
    case 'tertiary':
      return button({ type: 'tertiary' });
  }
}

export const DSButton = component$(
  ({ variant, class: classExtension, ...props }: DSButtonProps) => {
    const buttonClass = getButtonClassFromVariant(variant);
    return (
      <button class={cx(buttonClass, classExtension)} {...props}>
        <Slot />
      </button>
    );
  }
);
