import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { css, cx } from '@styles/css';
import { flex, hstack, vstack } from '@styles/patterns';
import { text } from '@styles/recipes';
import { ThemeToggle } from '~/components/themeToggle/themeTogle';
import Logo from '~/images/logo.svg?jsx';
type NavbarSection = {
  title: string;
  href: string;
};

const sections: NavbarSection[] = [
  { title: 'Resume', href: '/KuekResume.pdf' },
  { title: 'About Me', href: '/#about-me' },
  { title: 'Portfolio', href: '/#portfolio' },
  { title: 'Skills', href: '#skills' },
  { title: 'Snippets', href: '/snippets' },
];

export const Navbar = component$(() => {
  return (
    <>
      <nav
        class={css({
          position: 'fixed',
          zIndex: 2,
          w: 'full',
          backdropFilter: 'blur(5px)',
          top: 0,
          _before: {
            content: '""',
            inset: 0,
            position: 'absolute',
            backgroundImage: 'backgroundImage',
            opacity: '.7',
            zIndex: -1,
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& a': {
            outlineOffset: '5px',
          },
        })}
      >
        <div class={css({ padding: '16px 24px' })}>
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
        </div>
        <MobileNavbar />
        <DesktopNavbar />
      </nav>
    </>
  );
});

const MobileNavbar = component$(() => {
  const showNavDrawer = useSignal(false);
  return (
    <>
      <div class={css({ hideFrom: 'md', background: 'inherit' })}>
        <div
          class={flex({
            background: 'inherit',
            justifyContent: 'flex-end',
            minH: '14',
            left: 0,
            right: 0,
          })}
        >
          <button
            class={vstack({
              p: 4,
              zIndex: 3,
            })}
            onClick$={() => {
              showNavDrawer.value = !showNavDrawer.value;
            }}
            aria-haspopup
            aria-expanded={showNavDrawer.value}
            aria-controls="nav-menu"
            aria-label="open navigation menu"
          >
            <div
              class={vstack({
                color: 'inherit',
                gap: 1.5,
                '& div': { w: '24px', h: '2px', background: 'text' },
                transform: showNavDrawer.value ? 'translateY(4px)' : 'none',
                transition: 'transform linear 200ms',
                '& > div': {
                  transition: 'transform linear 200ms',
                  '&:first-child': {
                    transform: showNavDrawer.value
                      ? 'rotateZ(45deg) translateY(2px)'
                      : 'none',
                  },
                  '&:nth-child(2)': {
                    transform: showNavDrawer.value
                      ? 'rotate(-45deg) scaleX(1.41) translate(2px, -1px)'
                      : 'none',
                  },
                  '&:last-child': {
                    transform: showNavDrawer.value
                      ? 'rotateZ(45deg) translateY(-2px)'
                      : 'none',
                    transformOrigin: '22px',
                  },
                },
              })}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </div>
        <div
          style={{
            '--visible': showNavDrawer.value ? 'visible' : 'hidden',
            '--opacity': showNavDrawer.value ? '.5' : '0',
          }}
          class={css({
            visibility: 'var(--visible)' as any,
            w: 'screen',
            h: 'screen',
            zIndex: 1,
            position: 'fixed',
            top: 0,
            left: 0,
            background: 'neutral.800',
            opacity: 'var(--opacity)',
            transition: 'visibility 500ms ease, opacity 500ms ease',
          })}
          onClick$={() => (showNavDrawer.value = false)}
        />
      </div>
      <ul
        class={vstack({
          gap: '0',
          height: '100vh',
          transform: !showNavDrawer.value
            ? 'translateX(-100%)'
            : 'translateX(0)',
          transition: 'transform ease 250ms',
          background: 'background',
          top: '0',
          position: 'fixed',
          width: 'max(40vw, 266px)',
          alignItems: 'flex-start',
          zIndex: 3,
          pt: 6,
          hideFrom: 'md',
        })}
        role="menu"
        id="nav-menu"
      >
        {sections.map((section, idx) => (
          <li
            key={idx}
            class={css({
              display: 'flex',
              width: 'full',
              paddingInline: 4,
            })}
            onClick$={() => (showNavDrawer.value = false)}
            role="none"
          >
            <Link
              href={section.href}
              class={cx(
                css({
                  p: 3,
                  width: 'full',
                  borderBottomWidth: '1px',
                  borderColor: 'zinc.700',
                  '&:hover': { color: 'teal.600' },
                }),
                text({ size: 'body' })
              )}
              role="menuitem"
            >
              {section.title}
            </Link>
          </li>
        ))}
        <li
          class={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            paddingBlock: '24px',
          })}
          role="menuitem"
        >
          <ThemeToggle />
        </li>
      </ul>
    </>
  );
});

const DesktopNavbar = component$(() => {
  return (
    <ul
      class={hstack({
        gap: 6,
        justifyContent: 'flex-end',
        paddingInline: 6,
        paddingBlock: '16px',
        fontSize: 16,
        hideBelow: 'sm',
      })}
    >
      {sections.map((section, idx) => (
        <li key={idx} class={css({ display: 'flex' })}>
          <Link
            href={section.href}
            class={cx(
              css({
                h: 'full',
                '&:hover': { color: 'teal.600' },
              }),
              text({ size: 'body' })
            )}
          >
            {section.title}
          </Link>
        </li>
      ))}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
});
