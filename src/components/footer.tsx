import { Slot, component$ } from '@builder.io/qwik';
import { Link, type LinkProps } from '@builder.io/qwik-city';
import { css, cx } from '@styles/css';
import { flex } from '@styles/patterns';
import { text } from '@styles/recipes';
import QwikLogo from '~/images/qwik.svg?jsx';
import LinkedInLogo from '~/images/linkedin.svg?jsx';
import GitHubLogo from '~/images/github.svg?jsx';
import Envelope from '~/images/envelope.svg?jsx';

const FooterLinkGroup = component$(
  ({ title, containerClass }: { title?: string; containerClass?: string }) => {
    return (
      <div
        class={cx(
          flex({
            alignItems: 'center',
            paddingInline: '16px',
            flexDirection: 'column',
          }),
          containerClass
        )}
      >
        {title && <span>{title}</span>}
        <ul class={css({ display: 'flex', gap: '10px' })}>
          <Slot />
        </ul>
      </div>
    );
  }
);

const FooterLinkItem = component$((props: LinkProps) => (
  <li class={flex({ alignItems: 'center' })}>
    <Link
      class={cx(
        text({ size: 'title' }),
        css({ height: 'auto', width: '32px' })
      )}
      target="_blank"
      rel="noopener"
      {...props}
    >
      <Slot />
    </Link>
  </li>
));

export default component$(() => {
  return (
    <footer
      class={css({
        height: '70px',
        display: 'flex',
        position: 'relative',
        width: 'full',
        top: '70px',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1408px',
        margin: '0 auto',
      })}
    >
      <FooterLinkGroup
        containerClass={css({
          justifyContent: 'flex-end',
          height: 'full',
          paddingBottom: '12px',
        })}
      >
        <FooterLinkItem
          href="https://github.com/nkuek/"
          aria-label="GitHub"
          title="GitHub"
        >
          <GitHubLogo />
        </FooterLinkItem>
        <FooterLinkItem
          href="https://www.linkedin.com/in/nick-kuek/"
          aria-label="LinkedIn"
          title="Panda CSS"
        >
          <LinkedInLogo />
        </FooterLinkItem>
        <FooterLinkItem
          href="mailto:contact@nkuek.dev"
          aria-label="Email"
          title="Email"
        >
          <Envelope />
        </FooterLinkItem>
      </FooterLinkGroup>
      <FooterLinkGroup title="Made with ❤️ with:">
        <FooterLinkItem
          href="https://panda-css.com/"
          aria-label="panda-css"
          title="Panda CSS"
        >
          🐼
        </FooterLinkItem>
        <FooterLinkItem
          href="https://qwik.builder.io/"
          aria-label="Qwik"
          title="Qwik"
        >
          <QwikLogo />
        </FooterLinkItem>
      </FooterLinkGroup>
    </footer>
  );
});
