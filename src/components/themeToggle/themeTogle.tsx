import { component$, event$, useContext } from '@builder.io/qwik';
import { css } from '@styles/css';
import { themeStorageKey } from '~/components/router-head/theme-script';
import { SunAndMoon } from '~/components/themeToggle/sunAndMoon';
import { ThemeContext } from '~/root';

export type ThemePreference = 'dark' | 'light';

export const colorSchemeChangeListener = (
  onColorSchemeChange: (isDark: boolean) => void
) => {
  const listener = ({ matches: isDark }: MediaQueryListEvent) => {
    onColorSchemeChange(isDark);
  };
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => listener(event));

  return () =>
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', listener);
};

export const setPreference = (theme: ThemePreference) => {
  localStorage.setItem(themeStorageKey, theme);
  reflectPreference(theme);
};

export const reflectPreference = (theme: ThemePreference) => {
  document.firstElementChild?.setAttribute('data-theme', theme);
};

export const getColorPreference = (): ThemePreference => {
  if (localStorage.getItem(themeStorageKey)) {
    return localStorage.getItem(themeStorageKey) as ThemePreference;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
};

export const ThemeToggle = component$(() => {
  const theme = useContext(ThemeContext);

  const onClick$ = event$(() => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference(theme.value);
  });

  return (
    <>
      <span class={css({ display: 'block' })}>
        <button
          type="button"
          class={css({
            display: 'block',
            aspectRatio: 1,
            borderRadius: '50%',
            outlineOffset: '5px',
            _hover: {
              '& svg': {
                '& > circle': {
                  fill: 'teal.600',
                },
                '& > g': {
                  stroke: 'teal.600',
                },
              },
            },
          })}
          id="theme-toggle"
          title="Toggles light & dark"
          aria-label={theme.value}
          aria-live="polite"
          onClick$={onClick$}
        >
          <SunAndMoon />
        </button>
      </span>
    </>
  );
});
