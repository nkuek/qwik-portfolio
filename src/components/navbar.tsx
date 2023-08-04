import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { css } from '@styles/css';
import { flex, hstack, vstack } from '@styles/patterns';

type NavbarSection = {
  title: string;
  href: string;
};

const sections: NavbarSection[] = [
  { title: 'Resume', href: '/resume' },
  { title: 'Snippets', href: '/snippets' },
  { title: 'About Me', href: '#about-me' },
  { title: 'Portfolio', href: '#portfolio' },
  { title: 'Skills', href: '#skills' },
  { title: 'Education', href: '#education' },
  { title: 'Contact', href: '#contact' },
];

export const Navbar = component$(() => {
  return (
    <>
      <nav
        class={css({
          position: 'fixed',
          zIndex: 2,
          w: 'full',
          background: 'inherit',
        })}
      >
        <MobileNavbar />
        <DesktopNavbar />
      </nav>
    </>
  );
});

const MobileNavbar = component$(() => {
  const showNavDrawer = useSignal(false);
  return (
    <div class={css({ hideFrom: 'md' })}>
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
            color: 'inherit',
            gap: 1.5,
            '& div': { w: '24px', h: '2px', background: 'neutral.500' },
            p: 4,
            zIndex: 3,
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
          onClick$={() => {
            showNavDrawer.value = !showNavDrawer.value;
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      {showNavDrawer.value && (
        <div
          class={css({
            w: 'screen',
            h: 'screen',
            zIndex: 1,
            position: 'fixed',
            top: 0,
          })}
          onClick$={() => (showNavDrawer.value = false)}
        />
      )}
      <ul
        class={vstack({
          gap: '0',
          height: '100dvh',
          transform: !showNavDrawer.value
            ? 'translateX(-100%)'
            : 'translateX(0)',
          transition: 'transform ease 250ms',
          background: 'neutral.800',
          top: '0',
          position: 'fixed',
          width: '40vw',
          alignItems: 'flex-start',
          zIndex: 3,
          pt: 6,
        })}
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
          >
            <Link
              href={section.href}
              class={css({
                p: 3,
                width: 'full',
                borderBottomWidth: '1px',
                borderColor: 'zinc.700',
                '&:hover': { color: 'teal.600' },
              })}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

const DesktopNavbar = component$(() => {
  return (
    <ul
      class={hstack({
        gap: 6,
        justifyContent: 'flex-end',
        px: 6,
        fontSize: 16,
        hideBelow: 'sm',
      })}
    >
      {sections.map((section, idx) => (
        <li key={idx} class={css({ display: 'flex' })}>
          <Link
            href={section.href}
            class={css({
              h: 'full',
              py: '16px',
              '&:hover': { color: 'teal.600' },
            })}
          >
            {section.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});
