import { Slot, component$ } from '@builder.io/qwik';
import { css } from '@styles/css';

export default component$(() => {
  return (
    <article class={css({ minHeight: '100vh' })}>
      <Slot />
    </article>
  );
});
