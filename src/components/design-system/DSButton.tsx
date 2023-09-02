import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx } from '@styles/css';
import { button } from '@styles/recipes';

export type DSButtonPropsBase = {
  variant: 'primary' | 'secondary' | 'tertiary';
  class?: string;
};

type DSButtonProps = Omit<QwikIntrinsicElements['button'], 'class'> &
  DSButtonPropsBase;

export const DSButton = component$(
  ({ variant, class: classExtension, ...props }: DSButtonProps) => {
    return (
      <button class={cx(button({ type: variant }), classExtension)} {...props}>
        <Slot />
      </button>
    );
  }
);
