import {
  type Signal,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useServerData,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { css } from "@styles/css";
import { RouterHead } from "./components/router-head/router-head";
import { inject } from "@vercel/analytics";

import "./global.css";
import {
  type ThemePreference,
  colorSchemeChangeListener,
  getColorPreference,
  setPreference,
} from "~/components/themeToggle/themeTogle";
import { injectSpeedInsights } from "@vercel/speed-insights";

export const ThemeContext = createContextId<Signal<ThemePreference>>("dark");

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  const theme = useSignal<ThemePreference>();
  useVisibleTask$(() => {
    theme.value = getColorPreference();
    return colorSchemeChangeListener((isDark) => {
      theme.value = isDark ? "dark" : "light";
      setPreference(theme.value);
    });
  });

  useVisibleTask$(() => {
    inject();
    injectSpeedInsights();
  });

  useContextProvider(ThemeContext, theme);

  const nonce = useServerData<string | undefined>("nonce");

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
          fontFamily: "poppins",
          backgroundColor: "background",
          color: "text",
          minH: "100vh",
          backgroundImage: "backgroundImage",
          transition:
            "background 500ms ease, backgroundImage 500ms ease, color 500ms ease",
        })}
      >
        <RouterOutlet />
        <ServiceWorkerRegister nonce={nonce} />
      </body>
    </QwikCityProvider>
  );
});
