import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { css } from '@styles/css';

type LoadingDotsProps = Omit<QwikIntrinsicElements['div'], 'class'> & {
  class?: string;
};

export const LoadingDots = component$(
  ({ class: classExtension }: LoadingDotsProps) => {
    return (
      <div
        class={[
          css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& div': {
              width: '8px',
              height: '8px',
              backgroundColor: 'neutral.300',
              borderRadius: '50%',
              margin: '3px',
              animation: 'loading 1s infinite ease',
              '&:nth-child(1)': {
                animationDelay: '100ms',
              },
              '&:nth-child(2)': {
                animationDelay: '200ms',
              },
              '&:nth-child(3)': {
                animationDelay: '300ms',
              },
            },
          }),
          classExtension,
        ]}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }
);
