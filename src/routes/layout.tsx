import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { Navbar } from '~/components/navbar';
import { getVitals } from '~/vitals';
import { useLocation } from '@builder.io/qwik-city';
import Footer from '~/components/footer';
import { isDev } from '@builder.io/qwik/build';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

const analyticsId = import.meta.env.VITE_VERCEL_ANALYTICS_ID;

export default component$(() => {
  const location = useLocation();

  useVisibleTask$(({ track }) => {
    console.log(isDev);
    track(() => location.url.pathname);
    getVitals({
      pathname: location.url.pathname,
      analyticsId,
      params: location.params,
    });
  });
  return (
    <>
      <Navbar />
      <div class={css({ position: 'relative', top: '70px' })}>
        <Slot />
      </div>
      <Footer />
    </>
  );
});
