import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';
import { css } from '@styles/css';

export default component$(() => {
  const head = useDocumentHead();
  const headerId = head.title.replace(' ', '-').toLowerCase();

  return (
    <>
      <h1 id={headerId}>
        <a
          aria-hidden
          tabIndex={-1}
          href={`#${headerId}`}
          class={css({ position: 'absolute', inset: 0 })}
        >
          <span class="icon icon-link" />
        </a>
        {head.title}
      </h1>
      <p>
        <em>{head.frontmatter.caption}</em>
      </p>
      <hr />
    </>
  );
});
