import { Resource, Slot, component$, useResource$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { css, cx } from '@styles/css';
import { text } from '@styles/recipes';
import { MDXProvider } from 'mdx-js-qwik';
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
              '& a': {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                _hover: {
                  color: 'teal.600',
                },
              },
            })}
          >
            {prev && (
              <Link
                class={cx(
                  css({ left: 0 }),
                  text({
                    size: {
                      base: 'mobileBody',
                      md: 'body',
                    },
                  })
                )}
                href={`/${parentSlug}/${prev.slug}`}
              >
                &lt; Previous: {prev.title}
              </Link>
            )}
            {next && (
              <Link
                class={cx(
                  css({ right: 0 }),
                  text({
                    size: {
                      base: 'mobileBody',
                      md: 'body',
                    },
                  })
                )}
                href={`/${parentSlug}/${next.slug}`}
              >
                Next: {next.title} &gt;
              </Link>
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
