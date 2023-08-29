import { Slot, component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import ArticleHead from '~/components/articleHead';

export default component$(() => {
  return (
    <article class={css({ minHeight: '100vh' })}>
      <ArticleHead />
      <Slot />
    </article>
  );
});
