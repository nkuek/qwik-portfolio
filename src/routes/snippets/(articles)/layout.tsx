import { Slot, component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { MDXProvider } from 'mdx-js-qwik';
import mdxComponents from '~/components/mdxComponents';

export default component$(() => {
  return (
    <article class={css({ minHeight: '100vh' })}>
      <MDXProvider components={mdxComponents}>
        <div class={css({ '& > *:not(h1, hr)': { margin: '16px auto' } })}>
          <Slot />
        </div>
      </MDXProvider>
    </article>
  );
});
