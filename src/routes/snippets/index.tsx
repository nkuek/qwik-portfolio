import { type Component, component$, Slot } from '@builder.io/qwik';
import { type DocumentHead, Link } from '@builder.io/qwik-city';
import { css, cx } from '@styles/css';
import { vstack } from '@styles/patterns';
import { text } from '@styles/recipes';
import { LiquidFillButton } from '~/components/liquidFillButton';
import SliderPuzzle from '~/components/sliderPuzzle';

type Article = {
  slug: string;
  title: string;
  caption: string;
  preview: Component<any>;
};

const PreviewComponent = component$(
  ({ extraClass }: { extraClass?: string }) => {
    return (
      <div
        class={cx(
          css({
            background: '#282a36',
            padding: '12px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px',
          }),
          extraClass
        )}
      >
        <Slot />
      </div>
    );
  }
);

export default component$(() => {
  const articleList: Article[] = [
    {
      slug: 'liquid-fill-button',
      title: 'Liquid Fill Button',
      caption: 'Transforming static confines into a fluid dreamscape',
      preview: component$(() => (
        <PreviewComponent>
          <LiquidFillButton darkBackground showcase>
            Hover
          </LiquidFillButton>
        </PreviewComponent>
      )),
    },
    {
      slug: 'slider-puzzle',
      title: 'Slider Puzzle',
      caption:
        'Shifting echoes, a fragmented dance; patterns emerge, secrets in motion',
      preview: component$(() => (
        <PreviewComponent extraClass={css({ height: '30vh' })}>
          <div
            class={css({
              aspectRatio: 1,
              height: 'full',
              width: 'auto',
              marginInline: 'auto',
              pointerEvents: 'none',
            })}
          >
            <SliderPuzzle noShuffle />
          </div>
        </PreviewComponent>
      )),
    },
  ];
  return (
    <div class={vstack({ width: 'full', gap: '96px' })}>
      <div class={vstack({ gap: '24px' })}>
        <h1>Snippets</h1>
        <p
          class={cx(
            css({
              color: 'caption',
              textAlign: 'center',
            }),
            text({
              size: {
                base: 'mobileBody',
                md: 'caption',
              },
            })
          )}
        >
          Exploring elegant solutions through code. A collection of carefully
          crafted code snippets that showcase my journey in
          web&nbsp;development.
        </p>
      </div>
      <ol class={css({ width: 'full' })}>
        {articleList.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/snippets/${article.slug}`}
              class={css({
                borderTop: '1px solid',
                padding: '24px 0',
                justifyContent: 'space-between',
                width: 'full',
                display: 'block',
                _hover: {
                  color: 'teal.600',
                  borderColor: 'text',
                },
              })}
            >
              <div>
                <h2>{article.title}</h2>
                <span
                  class={cx(
                    text({
                      size: {
                        base: 'mobileBody',
                        md: 'caption',
                      },
                    }),
                    css({ fontStyle: 'italic' })
                  )}
                >
                  {article.caption}
                </span>
              </div>
              <article.preview />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Snippets',
  meta: [
    {
      name: 'description',
      content:
        'Exploring elegant solutions through code. A collection of carefully crafted code snippets that showcase my journey in web development.',
    },
    {
      name: 'og:title',
      content: 'Snippets',
    },
    {
      name: 'og:description',
      content:
        'Exploring elegant solutions through code. A collection of carefully crafted code snippets that showcase my journey in web development.',
    },
  ],
  links: [{ rel: 'canonical', href: 'https://www.nkuek.dev/snippets/' }],
};
