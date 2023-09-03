import { Resource, Slot, component$, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { MDXProvider } from 'mdx-js-qwik';
import { DSLinkContainer } from '~/components/design-system/DSLink';
import { DSText } from '~/components/design-system/DSText';
import mdxComponents from '~/components/mdxComponents';
import { type Article, getArticles } from '~/routes/snippets';
import ChevronRight from '~/images/chevronRight.svg?jsx';
import ChevronLeft from '~/images/chevronLeft.svg?jsx';

function getArticleNavigation(articleSlug: string, articles: Article[]) {
  const currentArticleIndex = articles.findIndex(
    (article) => article.slug === articleSlug
  );
  let prev: Article | undefined;
  let next: Article | undefined;

  if (currentArticleIndex === -1) {
    return {
      prev,
      next,
    };
  }

  if (currentArticleIndex < articles.length - 1) {
    next = articles[currentArticleIndex + 1];
  }

  if (currentArticleIndex > 0) {
    prev = articles[currentArticleIndex - 1];
  }

  return {
    prev,
    next,
  };
}

const FooterNavigation = component$(() => {
  const articleSlugs = useResource$(getArticles);

  const location = useLocation();

  return (
    <Resource
      value={articleSlugs}
      onResolved={(slugs) => {
        const pathname = location.url.pathname;
        const [parentSlug, articleSlug] = pathname.split('/').filter(Boolean);
        const { prev, next } = getArticleNavigation(articleSlug, slugs);
        return (
          <div
            class={css({
              position: 'relative',
              width: 'full',
              marginTop: '24px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              display: 'flex',
              '& a': {
                padding: 2,
                _hover: {
                  color: 'teal.600',
                },
              },

              '& svg': {
                height: '.75em',
              },
            })}
          >
            {prev && (
              <DSLinkContainer
                class={css({ display: 'flex', alignItems: 'flex-end' })}
                href={`/${parentSlug}/${prev.slug}`}
                aria-label={`Go to previous page: ${prev.title}`}
              >
                <DSText size="caption" class={css({ marginBottom: '.44em' })}>
                  <ChevronLeft />
                </DSText>
                <div class={css({ display: 'grid', marginLeft: '6px' })}>
                  <DSText class={css({ opacity: 0.7 })} size="caption">
                    Previous
                  </DSText>
                  <DSText size="body">{prev.title}</DSText>
                </div>
              </DSLinkContainer>
            )}
            {next && (
              <DSLinkContainer
                class={css({
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginLeft: 'auto',
                })}
                href={`/${parentSlug}/${next.slug}`}
                aria-label={`Go to next page: ${next.title}`}
              >
                <div class={css({ display: 'grid', marginRight: '6px' })}>
                  <DSText class={css({ opacity: 0.6 })} size="body">
                    Next
                  </DSText>
                  <DSText size="body">{next.title}</DSText>
                </div>
                <DSText size="caption" class={css({ marginBottom: '.4em' })}>
                  <ChevronRight />
                </DSText>
              </DSLinkContainer>
            )}
          </div>
        );
      }}
    />
  );
});

export default component$(() => {
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
      <FooterNavigation />
    </article>
  );
});
