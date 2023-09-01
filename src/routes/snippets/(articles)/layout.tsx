import { Slot, component$, useTask$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { MDXProvider } from 'mdx-js-qwik';
import mdxComponents from '~/components/mdxComponents';

export default component$(() => {
  useTask$(async () => {});

  return (
    <article class={css({ minHeight: '100vh' })}>
      <MDXProvider components={mdxComponents}>
        <div
          class={css({
            '& > *:not(h1, h2, hr)': {
              margin: '16px auto 0',
            },
          })}
        >
          <Slot />
        </div>
      </MDXProvider>
    </article>
  );
});
