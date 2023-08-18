import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body
        lang="en"
        class={css({
          fontFamily: 'roboto',
          backgroundColor: 'neutral.900',
          color: 'stone.50',
          minH: '100vh',
          backgroundImage: `-webkit-linear-gradient(
                top,
                rgba(23, 24, 32, 0.95),
                rgba(23, 24, 32, 0.95)
                ),
                url('/images/overlay.png')`,
        })}
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
