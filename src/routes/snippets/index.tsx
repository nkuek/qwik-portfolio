import {
  type Component,
  component$,
  Slot,
  $,
  useResource$,
  Resource,
} from '@builder.io/qwik';
import { type DocumentHead, Link, server$ } from '@builder.io/qwik-city';
import { css, cx } from '@styles/css';
import { vstack } from '@styles/patterns';
import { text } from '@styles/recipes';
import { LiquidFillButton } from '~/components/liquidFillButton';
import SliderPuzzle from '~/components/sliderPuzzle';

const extractSlugFromFilePath = $((path: string) => {
  const pattern = /\.\/\(articles\)\/([a-z0-9-]+)\/index\.mdx/;

  const match = path.match(pattern);

  if (match) {
    const articleTitle = match[1];
    return articleTitle;
  } else {
    return null;
  }
});

type ArbitraryFileType = {
  headings: () => unknown;
  head: () => unknown;
  frontmatter: {
    title: string;
    description: string;
    caption: string;
  };
};

const articleMdxFiles = import.meta.glob<ArbitraryFileType>('./**/*.mdx');

const getArticleList = server$(() => {
  return Object.entries(articleMdxFiles).map(async ([articlePath, file]) => {
    const articleData = await file();
    const slug = extractSlugFromFilePath(articlePath);
    return {
      ...articleData.frontmatter,
      slug,
    };
  });
});

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
  const articles = useResource$(async () => {
    const articlePromises = await getArticleList();
    return await Promise.all(articlePromises);
  });
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
        <h1
          class={text({
            size: {
              base: 'mobileHero',
              md: 'hero',
            },
          })}
        >
          Snippets
        </h1>
        <p
          class={cx(
            css({
              color: 'caption',
              textAlign: 'center',
            }),
            text({
              size: {
                base: 'mobileBody',
                md: 'body',
              },
            })
          )}
        >
          Exploring elegant solutions through code. A collection of carefully
          crafted code snippets that showcase my journey in
          web&nbsp;development.
        </p>
      </div>
      <Resource
        value={articles}
        onResolved={(articles) => <>{JSON.stringify(articles)}</>}
      />
      <ol class={css({ width: 'full' })}>
        {articleList.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/snippets/${article.slug}`}
              class={css({
                borderTop: '1px solid',
                padding: '24px 0 64px',
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
                <h2
                  class={text({
                    size: {
                      base: 'mobileTitle',
                      md: 'title',
                    },
                  })}
                >
                  {article.title}
                </h2>
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
      content: 'Exploring elegant solutions through code.',
    },
    {
      name: 'og:title',
      content: 'Snippets',
    },
    {
      name: 'og:description',
      content: 'Exploring elegant solutions through code.',
    },
  ],
  links: [{ rel: 'canonical', href: 'https://www.nkuek.dev/snippets/' }],
};
