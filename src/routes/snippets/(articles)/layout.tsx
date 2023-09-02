import { Resource, Slot, component$, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { MDXProvider } from 'mdx-js-qwik';
import { DSLink } from '~/components/design-system/DSLink';
import mdxComponents from '~/components/mdxComponents';
import { type Article, getArticles } from '~/routes/snippets';

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
            })}
          >
            {prev && (
              <DSLink size="body" href={`/${parentSlug}/${prev.slug}`}>
                &lt; Previous: {prev.title}
              </DSLink>
            )}
            {next && (
              <DSLink
                size="body"
                class={css({ marginLeft: 'auto' })}
                href={`/${parentSlug}/${next.slug}`}
              >
                Next: {next.title} &gt;
              </DSLink>
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
