import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import styles from './markdownStyles.css?inline';
import ParticlesAnimation from '~/components/particles';

export default component$(() => {
  useStyles$(styles);

  return (
    <div
      class={cx(
        css({
          margin: '0 32px',
          position: 'relative',
        }),
        'snippets'
      )}
    >
      <ParticlesAnimation />
      <div
        class={css({
          position: 'relative',
          margin: '0 auto',
          maxWidth: '676px',
          padding: '72px 0 80px',
          background: 'transparent',
          minHeight: 'calc(100vh - 70px)',
          transition: 'background 500ms ease',
          _before: {
            content: '""',
            inset: 0,
            position: 'absolute',
            zIndex: -1,
            backdropFilter: 'blur(5px)',
          },
        })}
      >
        <Slot />
      </div>
    </div>
  );
});
