import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import styles from './styles.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <div
      class={css({
        minHeight: '100vh',
        paddingBottom: '80px',
        margin: '0 32px',
      })}
    >
      <div class={cx(css({ margin: '0 auto', maxWidth: '676px' }), 'snippets')}>
        <Slot />
      </div>
    </div>
  );
});
