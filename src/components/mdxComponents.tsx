import { Slot, component$ } from '@builder.io/qwik';
import { css } from '@styles/css';
import { DSText } from '~/components/design-system/DSText';

export default {
  p: component$((props) => (
    <DSText
      size="body"
      tag="p"
      {...props}
      class={css({
        '& > code': {
          background: 'inlineCode',
          padding: '0 0.25rem',
          borderRadius: '0.375rem',
          whiteSpace: 'nowrap',
          fontFamily: 'sourceCodePro',
        },
        '& > a': {
          textDecoration: 'underline',
          _hover: {
            color: 'links.hover',
          },
        },
      })}
    >
      <Slot />
    </DSText>
  )),
  hr: component$(() => (
    <hr class={css({ color: 'teal.700', margin: '24px auto' })} />
  )),
  h1: component$(() => {
    return (
      <DSText
        size="hero"
        tag="h1"
        class={css({
          position: 'relative',
          width: 'fit-content',
          '&:not(:first-child)': {
            marginTop: '32px',
          },
          '& + *': {
            marginTop: '8px',
          },
        })}
      >
        <Slot />
      </DSText>
    );
  }),
  h2: component$((props) => (
    <DSText
      tag="h2"
      size="title"
      // Used for the rehypeAutolinkHeadings vite plugin to automatically pass the id for navigation.
      {...props}
      class={css({
        scrollMarginTop: '86px',
        marginTop: '32px',
        width: 'fit-content',
        '& + *': {
          marginTop: '8px',
        },
        position: 'relative',
        '& a': {
          position: 'absolute',
          inset: 0,
          '& .icon': {
            height: '100vh',
            display: 'none',
            _after: {
              position: 'absolute',
              content: '"#"',
              left: '-1em',
              color: '#0d9488',
            },
          },
          _hover: {
            '& .icon': {
              display: 'inline',
            },
          },
        },
      })}
    >
      <Slot />
    </DSText>
  )),
  pre: component$((props) => (
    <pre
      class={css({
        display: 'flex',
        padding: '12px',
        borderRadius: '6px',
        overflow: 'auto',
        background: '#282a36',
        '& > *': {
          fontFamily: 'firaCode',
        },
      })}
      {...props}
    >
      <Slot />
    </pre>
  )),
  em: component$((props) => (
    <em class={css({ fontStyle: 'italic' })} {...props}>
      <Slot />
    </em>
  )),
  strong: component$((props) => (
    <strong {...props} class={css({ fontWeight: 600 })}>
      <Slot />
    </strong>
  )),
};
