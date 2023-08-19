export const themeStorageKey = 'theme-preference';

export const ThemeScript = ({ nonce }: { nonce?: string }) => {
  const themeScript = `
        document.firstElementChild
            .setAttribute('data-theme',
                localStorage.getItem('${themeStorageKey}') ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            )`;
  return <script nonce={nonce} dangerouslySetInnerHTML={themeScript} />;
};
