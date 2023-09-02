import { Slot, component$ } from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import { text } from '@styles/recipes';

export default {
  p: component$((props) => (
    <p
      {...props}
      class={cx(
        text({ size: { base: 'mobileBody', md: 'body' } }),
        css({
          '& > code': {
            background: 'inlineCode',
            padding: '0 0.25rem',
            borderRadius: '0.375rem',
            whiteSpace: 'nowrap',
            fontFamily: 'sourceCodePro',
          },
        })
      )}
    >
      <Slot />
    </p>
  )),
  hr: component$(() => (
    <hr class={css({ color: 'teal.700', margin: '24px auto 48px' })} />
  )),
  h1: component$(() => {
    return (
      <h1
        class={cx(
          text({ size: { base: 'mobileHero', md: 'hero' } }),
          css({
            position: 'relative',
            width: 'fit-content',
            '&:not(:first-child)': {
              marginTop: '32px',
            },
            '& + *': {
              marginTop: '8px',
            },
          })
        )}
      >
        <Slot />
      </h1>
    );
  }),
  h2: component$((props) => (
    <h2
      {...props}
      class={cx(
        text({ size: { base: 'mobileTitle', md: 'title' } }),
        css({
          scrollMarginTop: '86px',
          marginTop: '32px',
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
        })
      )}
    >
      <Slot />
    </h2>
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
};
