import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import styles from './styles.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <div
      class={cx(
        css({
          minHeight: '100vh',
          maxWidth: '676px',
          margin: '0 auto',
          paddingBottom: '80px',
        }),
        'snippets'
      )}
    >
      <Slot />
    </div>
  );
});
