import { component$, useServerData } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { ThemeScript } from '~/components/router-head/theme-script';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const nonce = useServerData<string | undefined>('nonce');

  return (
    <>
      <title>{head.title}</title>

      <meta name="og:image" content="/images/openGraph.png" />
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Poppins:wght@100;300;400;600&family=Source+Code+Pro&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/images/overlay.png" />
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
      <ThemeScript nonce={nonce} />
    </>
  );
});
